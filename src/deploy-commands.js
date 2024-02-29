const fs = require("fs");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require("@discordjs/rest");
const Logger = require('./function/logger');
const { Routes } = require('discord-api-types/v9'); 

const commands = []



const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);