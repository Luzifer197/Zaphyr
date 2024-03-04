const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
           .setName("ping")
           .setDescription("Zeigt an wie schnell der Bot antwortet"),
        async execute(interaction) {
            await interaction.reply(`Ping: ${(interaction.createdTimestamp - Date.now())} ms`)
        }}