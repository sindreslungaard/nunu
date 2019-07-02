const db = require('../db')
const commands = require('./index')

module.exports = async (client, message, args) => {

    message.channel.send(`
\`\`\`
@nunu use this channel
@nunu set threshold [number]
@nunu track [username] from [euw/na/eune]
@nunu help
\`\`\`
    `)

}