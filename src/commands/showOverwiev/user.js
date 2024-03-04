const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
        .addUserOption(option => option.setName('target').setDescription('markier ein User').setRequired(true)),
	async execute(interaction) {
        var target = interaction.options.getUser('target');
        if (!target) {
            target = interaction.member
        }
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        
        const userEmbed = new EmbedBuilder().setColor(randomColor)
                                            .setAuthor(`${interaction.member.username} aka ${interaction.member.nickname ? `alias ${interaction.member.nickname} ` : ""}`)
                                            .setThumbnail(target.avatar)
                                            .addFields(
                                                { name: "name:", value: target.username, inline: true },
                                                { name: "nickname:", value: target.nickname, inline: true },
                                                { name: "Beigetretten am:", value: target.joinedTimestamp, inline: true },
                                                { name: "Account Hergestellt am: ", value: target.user.createdTimestamp, inline: true },
                                                { name: "default Avatar", value: target.user.defaultAvatarUrl, inline: true },
                                                { name: "display Name", value: target.user.displayName, inline: true },
                                                { name: "Premium", value: target.premiumSinceTimestamp, inline: true },
                                                { name: "Rollen", value: target.roles, inline: true }
                                            )

		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
