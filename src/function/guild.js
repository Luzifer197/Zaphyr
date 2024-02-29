const Discord = require("discord.js");
const client = new Discord.Client();
const Logger = require('./function/logger'); 

// Funktion, um alle Guild-IDs abzurufen
function getAllGuildIDs(client, logger){
    var Guilds;
    try{
        Guilds = client.guilds.cache.map(guild => ({ id: guild.id, name: guild.name }));
        logger.log("All Guilds: " + JSON.stringify(Guilds));
    } catch(e) {
        logger.error("Error while loading Guilds: " + e);
    }
    return Guilds;
}

// Funktion, um die ID eines bestimmten Guilds abzurufen, wenn der Name übereinstimmt
function getGuildID(client, logger, guildname){
    const allGuilds = getAllGuildIDs(client, logger);
    const guild = allGuilds.find(guild => guild.name === guildname);
    if(guild) {
        logger.log(`ID of ${guildname}: ${guild.id}`);
        return guild.id;
    } else {
        logger.error(`Guild with name "${guildname}" not found.`);
        return null;
    }
}
