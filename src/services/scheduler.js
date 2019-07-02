const db = require('../db')
const riot = require('./riot')
const bot = require('../bot')

exports.run = async () => {

    let users = db.conn().get('tracked_users').value()

    if(!users || users.length < 1)
        return
    
    for(let user of users) {
        track(user).catch((e) => console.log(e.message))
    }

    setTimeout(() => this.run(), parseInt(process.env.INTERVAL))
    
}

const track = async (user) => {

    if(user.last_processed && parseInt(user.last_processed) >= Date.now() - parseInt(process.env.INTERVAL)) {
        return
    }

    let matchList = await riot.getMatchList(user.region, user.account_id)

    if(!matchList || !matchList.data || !matchList.data.matches || matchList.data.matches.length < 1) {
        return
    }
    
    let lastGameId = matchList.data.matches[0].gameId

    if(user.last_game_id && user.last_game_id == lastGameId) {
        return
    }

    let match = await riot.getMatch(user.region, lastGameId)

    if(!match || !match.data || !match.data.gameId) {
        return
    }

    let participantId = match.data.participantIdentities.find(x => { return x.player.currentAccountId == user.account_id })

    if(!participantId) {
        return
    }

    let participant = match.data.participants.find(x => { return x.participantId == participantId.participantId })

    if(!participant) {
        return
    }

    let toUpdate = false

    for(let guildId of user.guilds) {

        let settings = db.conn().get('guild_settings').get(guildId).value()

        let threshold = settings.kd_threshold || 10

        if(participant.stats.deaths - participant.stats.kills >= threshold) {

            toUpdate = true

            let guild = bot.client.guilds.get(guildId)
            let channel = guild.channels.find(x => { return x.id == settings.channel_to_use })
    
            //let matchHistoryUrl = `https://matchhistory.euw.leagueoflegends.com/en/#match-details/${user.region.toUpperCase()}/${lastGameId}`
    
            channel.send(`:japanese_ogre: ${user.username} just inted with \`${participant.stats.kills} kills\`, \`${participant.stats.deaths} deaths\` and \`${participant.stats.assists} assists\``)
            
        }

        if(toUpdate) {
            db.conn().get('tracked_users').find({ account_id: user.account_id }).assign({
                last_game_id: lastGameId,
                last_processed: Date.now()
            }).write()
        }

    }



}