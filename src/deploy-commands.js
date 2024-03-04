const fs = require("fs");
const path = require('node:path');
const { REST } = require("@discordjs/rest");
const Logger = require('./function/logger');
const { Routes } = require('discord-api-types/v9');
const { DISCORD_TOKEN, CLIENTID } = require('../config.json');

const logger = new Logger('/log/deploy.log')
const commands = []

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			logger.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        logger.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(CLIENTID),
            { body: commands },
        );

        logger.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        logger.error(`[Error] ${error}`);
    }
})();
