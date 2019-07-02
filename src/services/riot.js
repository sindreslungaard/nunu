const axios = require('axios')
const Bottleneck = require('bottleneck/es5')

const limiter = new Bottleneck({
    minTime: 333
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