const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const Logger = require('../../function/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy')
        .setDescription('Deploy new commands'),
    async execute(interaction) {
        const logger = new Logger('/log/deploy.log');

        // Überprüfe, ob der Benutzer der Besitzer ist
        if (interaction.user.id !== '435875814953844739') {
            logger.warn(`Benutzer ${interaction.user.tag} hat versucht, den Deploy-Befehl auszuführen, hat aber keine Berechtigung.`);
            return interaction.reply('Du hast keine Berechtigung, diesen Befehl auszuführen.');
        }

        // Führe den npm-Befehl aus
        exec('npm run deployCommands', (error, stdout, stderr) => {
            if (error) {
                logger.error(`Fehler beim Ausführen des Deploy-Befehls: ${error}`);
                return interaction.reply('Fehler beim Ausführen des Befehls.');
            }

            logger.log(`stdout: ${stdout}`);
            logger.warn(`stderr: ${stderr}`);

            // Sende eine Erfolgsnachricht an den Benutzer
            interaction.reply('Befehle erfolgreich bereitgestellt!');
            logger.log('Befehle erfolgreich bereitgestellt!')
        });
    },
};
