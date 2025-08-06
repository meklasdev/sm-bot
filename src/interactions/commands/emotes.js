const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emotes',
    description: 'Wyświetla wszystkie emotki serwera w jednym embede.',

    execute: async (interaction) => {
        const emojis = interaction.guild?.emojis?.cache;

        if (!emojis || emojis.size === 0) {
            return interaction.reply({ content: 'Brak emotek na serwerze.', flags: 64 });
        }

        const lines = emojis.map(e => `${e.toString()} - \`:${e.name}:\``);

        const embed = new EmbedBuilder()
            .setTitle('Emotki serwera')
            .setColor('#6f21ff')
            .setDescription(lines.join('\n'));

        await interaction.reply({ embeds: [embed], flags: 64 });
    }
};
