const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'r',
    description: 'Zmienia nazwę aktualnego kanału na test.',
    execute: async (interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: '> Nie masz uprawnień do zmiany nazwy kanału.', flags: 64 });
        }
        try {
            await interaction.channel.setName('test');
            await interaction.reply({ content: '> Nazwa kanału została zmieniona na **test**.', flags: 64 });
        } catch (error) {
            console.error('Błąd podczas zmiany nazwy kanału:', error);
            await interaction.reply({ content: '> Nie udało się zmienić nazwy kanału.', flags: 64 });
        }
    }
};
