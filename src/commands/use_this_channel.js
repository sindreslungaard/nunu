const db = require('../db')
const commands = require('./index')

module.exports = async (client, message, args) => {

    if(args.length < 4) {
        return commands.unknownCommand(client, message)
    }

    db.conn().set(`guild_settings.${message.guild.id}`, {
        channel_to_use: message.channel.id
    }).write()

    message.channel.send(`<#${message.channel.id}> is now my main channel`)

}