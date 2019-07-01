const db = require('../db')
const commands = require('./index')
const riot = require('../services/riot')

module.exports = async (client, message, args) => {

    if(args.length < 5 || args[args.length - 2] !== "from") {
        return commands.unknownCommand(client, message)
    }

    let region

    switch(args[args.length - 1].toLowerCase()) {
        case "euw": region = "euw1"; break;
        case "eune": region = "eun1"; break;
        case "na": region = "na1"; break;
    }

    if(!region) {
        return message.channel.send(`Couldn't find region \`${args[args.length - 1]}\``)
    }

    args.shift()
    args.shift()
    args.pop()
    args.pop()

    let username = args.join(" ")

    let userRes = await riot.getUserFromName(region, username)

    if(userRes.status === 404) {
        return message.channel.send(`The user \`username\` could not be find in region \`region\``)
    }

    if(userRes.status !== 200) {
        return message.channel.send("An error occured whilst connecting to the Riot Games API. Could not find the user.")
    }

    if(!userRes.data.accountId) {
        return message.channel.send("I received an unecpected result from the Riot Games API and couldn't complete your request")
    }

    let existingUser = db.conn().get('tracked_users').find({ account_id: userRes.data.accountId }).value()

    if(!existingUser) {
        db.conn().get('tracked_users').push({
            account_id: userRes.data.accountId,
            username: userRes.data.name,
            guilds: [
                message.guild.id
            ]
        }).write()
    }
    else {
        let guilds = db.conn().get('tracked_users').find({ account_id: userRes.data.accountId }).get('guilds').value()

        if(!guilds.includes(message.guild.id)) {
            guilds.push(message.guild.id)
            db.conn().get('tracked_users').find({ account_id: userRes.data.accountId }).assign({guilds}).write()
        } else {
            return message.channel.send(`I am already tracking \`${userRes.data.name}\` from \`${region}\``)
        }
    }

    message.channel.send(`I am now tracking \`${userRes.data.name}\` from \`${region}\``)

}