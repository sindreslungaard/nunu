require('dotenv').config()
const bot = require('./bot')
const db = require('./db')

db.connect()
bot.connect()