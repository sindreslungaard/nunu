require('dotenv').config()
const bot = require('./bot')
const db = require('./db')
const scheduler = require('./services/scheduler')

db.connect()
bot.connect()
scheduler.run()