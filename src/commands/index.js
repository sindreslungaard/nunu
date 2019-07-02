const useThisChannelCommand = require('./use_this_channel')
const trackUserCommand = require('./track_user')
const setThresholdCommand = require('./set_threshold')
const helpCommand = require('./help')

exports.handle = async (client, message) => {

    let args = message.content.replace(/\s+/g, " ").split(" ")

    if(!args || args.length < 1 || args[0] !== `<@${client.user.id}>`)
        return
    
    if(args.length < 2) {
        return this.unknownCommand(client, message)
    }

    switch(args[1]) {

        case "use": return await useThisChannelCommand(client, message, args)
        case "track": return await trackUserCommand(client, message, args)
        case "set": return await setThresholdCommand(client, message, args)
        case "help": return await helpCommand(client, message, args)
        
        default: {
            return this.unknownCommand(client, message)
        }
    }
}

exports.unknownCommand = (client, message) => {
    return message.channel.send(`<@${message.author.id}> I didn't quite get that. Use <@${client.user.id}> help to see available commands`)
}