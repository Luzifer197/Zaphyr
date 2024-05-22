const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('Guild')
    .setDescription('Receive server information .'),
    async execute(interaction) {
        
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const guild = interaction.guild;
        const members = guild.members.cache;
        const channels = guild.channels.cache;
        const roles = guild.roles.cache;

        const embed = new EmbedBuilder()
            .setColor(randomColor)
            .setTitle(`${guild.name} Server Information`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
                { name: 'Created At', value: `<t:${parseInt(guild.createdTimestamp / 1000)}:F>`, inline: true },
                { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true }
            )
            .setFooter({ text: `Owner: ${guild.members.cache.get(guild.ownerId).user.username} | ${guild.name}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};