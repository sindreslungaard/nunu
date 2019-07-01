const Discord = require('discord.js')
const commands = require('./commands')

exports.connect = () => {

    const client = new Discord.Client()

    client.on("ready", () => {

        console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
        client.user.setActivity(`Serving ${client.guilds.size} servers`)

        console.log(client.user)

    })

    client.on("message", async message => {

        try {

            if(message.author.bot) return

            await commands.handle(client, message)

        }
        catch(e) {
            console.log(e)
        }

    })

    client.login(process.env.DISCORD_SECRET)

}