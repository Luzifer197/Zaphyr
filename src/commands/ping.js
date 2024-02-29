const { SlashCommandBuilder } = require('discord.js');


module.exports = { 
    data: new SlashCommandBuilder()
           .setName("ping")
           .setDescription("Zeigt an wie schnell der Bot antwortet"),
        async execute(interaction) {
            await interaction.reply(`Ping: ${Date.now() - message.createdTimestamp}ms. \nAPI ping: ${Math.round(client.ws.ping)}ms`)
        }}