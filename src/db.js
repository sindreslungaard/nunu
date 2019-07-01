const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let database

exports.connect = () => {

    const adapter = new FileSync(process.env.DB_PATH || 'db.json')
    database = low(adapter)

    database.defaults({ tracked_users: [], guild_settings: {} }).write()

}

exports.conn = () => { return database }