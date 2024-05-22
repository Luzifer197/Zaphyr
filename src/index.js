const fs = require("fs")
const path = require('node:path');
const Logger = require('./function/logger');
const { Client, Events, Collection} = require("discord.js")
const { DISCORD_TOKEN, CLIENTSECRET, CLIENTID, BOTURL, APPID, PUBLICKEY } = require('../config.json');

const logger = new Logger('/log/runtime.log')
const client = new Client({intents:[]})

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			logger.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
    logger.log(`Ready! logged as ${readyClient.user.tag}`);
    client.user.setActivity(' Playing with the Code ');
    client.user.setAFK(true);
})

client.on(Events.InteractionCreate, async interaction =>{
    if ( !interaction.isChatInputCommand()) return;
    const nickname = interaction.member.nickname ? `alias ${interaction.member.nickname} ` : "";
    const username = interaction.member.user.username;
    const userID = interaction.member.id;
    const guildname = interaction.guild;

    logger.log(`User ${username} (ID = ${userID}) ${nickname}use ${interaction} in ${guildname}`)

    const command = interaction.client.commands.get(interaction.commandName);

    if ( !command ) {
        logger.error(`No command matching ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (error){
        logger.error(error);

        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

client.login(DISCORD_TOKEN)