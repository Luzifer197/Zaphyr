const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Receive information regarding a user in the server.')
    .addUserOption(option => option.setName('user').setDescription('The user to get info on').setRequired(false)),
    async execute(interaction) {
        
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag;
 
        const embed = new EmbedBuilder()
        .setColor(randomColor)
        .setAuthor({ name: tag, iconURL: icon})
        .setThumbnail(icon)
        .addFields({ name: "nickname", value: `${user.nickname}`, inline: true})
        .addFields({ name: "username", value: `${user.username}`, inline: true})
        .addFields({ name: "premium", value: `${user.premiumSinceTimestamp || "none"}`, inline: true})
        .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
        .addFields({ name: "Member", value: `${user}`, inline: false})
        .addFields({ name: "beigetretten in diese Server", value: `<t:${parseInt(member.joinedAt / 1000)}:R>`, inline: true})
        .addFields({ name: "beigetretten im Discord", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
        .setFooter({ text: `User-Name: ${user.username}`})
        .setTimestamp()
 
        await interaction.reply({ embeds: [embed] });
    }
}