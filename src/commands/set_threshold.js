const db = require('../db')
const commands = require('./index')

module.exports = async (client, message, args) => {

    if(args.length < 4 || args[1] !== "set" || args[2] !== "threshold") {
        return commands.unknownCommand(client, message)
    }

    let threshold = 10 
    try {
        threshold = parseInt(args[3])
    } catch(e) {
        message.channel.send(`${args[3]} is not a valid number`)
        return
    }

    db.conn().set(`guild_settings.${message.guild.id}.kd_threshold`, threshold).write()

    message.channel.send(`Updated KD threshold to \`${threshold}\``)

}