const Discord = require('discord.js')
const commands = require('./commands')

exports.client = null

exports.connect = () => {

    const client = new Discord.Client()

    client.on("ready", () => {

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

    this.client = client

}