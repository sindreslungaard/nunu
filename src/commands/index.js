const useThisChannelCommand = require('./use_this_channel')
const trackUserCommand = require('./track_user')

exports.handle = async (client, message) => {

    let args = message.content.replace(/\s+/g, " ").split(" ")

    if(!args || args.length < 1 || args[0] !== `<@${client.user.id}>`)
        return
    
    if(args.length < 2) {
        return unknownCommand(client, message)
    }

    switch(args[1]) {

        case "use": return await useThisChannelCommand(client, message, args)
        case "track": return await trackUserCommand(client, message, args)
        
        default: {
            return unknownCommand(client, message)
        }
    }
}

exports.unknownCommand = (client, message) => {
    return message.channel.send(`<@${message.author.id}> I didn't quite get that. Use <@${client.user.id}> help to see available commands`)
}