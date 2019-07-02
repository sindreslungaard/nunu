const axios = require('axios')
const Bottleneck = require('bottleneck/es5')

const limiter = new Bottleneck({
    minTime: parseInt(process.env.RATE_LIMIT)
})

exports.getUserFromName = async (region, username) => {

    try {
        let result = await limiter.schedule(() => axios({
            url: `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,
            method: "GET",
            headers: {
                'x-riot-token': process.env.RIOT_GAMES_API_KEY
            }
        }))
    
        return result
    }
    catch(e) {
        return e
    }

}

exports.getMatchList = async (region, account_id) => {

    try {
        let result = await limiter.schedule(() => axios({
            url: `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${account_id}`,
            method: "GET",
            headers: {
                'x-riot-token': process.env.RIOT_GAMES_API_KEY
            }
        }))
    
        return result
    }
    catch(e) {
        return e
    }

}

exports.getMatch = async (region, match_id) => {

    try {
        let result = await limiter.schedule(() => axios({
            url: `https://${region}.api.riotgames.com/lol/match/v4/matches/${match_id}`,
            method: "GET",
            headers: {
                'x-riot-token': process.env.RIOT_GAMES_API_KEY
            }
        }))
    
        return result
    }
    catch(e) {
        return e
    }

}