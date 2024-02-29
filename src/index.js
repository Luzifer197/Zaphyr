require("dotenv").config() 
const fs = require("fs")
const { Client, Collection, Intents} = require("discord.js")
const Logger = require('./function/logger');
const { DISCORD_TOKEN, CLIENTSECRET, CLIENTID, BOTURL, APPID, PUBLICKEY } = require('../config.json');

const logger = new Logger('logfile.log')
const client = new Client({intents:[Intents.FLAGS.GUILDS]})

client.once('ready', () =>{
    console.log(`Ready! logged as ${client.user.globalName}`)
    logger.log(`Ready! logged as ${client.user.globalName}`)
})

client.login(DISCORD_TOKEN)