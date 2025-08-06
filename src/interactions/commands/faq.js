const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config/reviewConfig');

module.exports = {
    name: 'faq',
    description: 'Wysyła panel FAQ z kategoriami i ticketem.',
    async execute(interaction) {
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription('## <:silent:1395058293432516658> FAQ\nWybierz kategorię, aby zobaczyć odpowiedzi.')
            .setColor('#6f21ff');

        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('faq')
                .setPlaceholder('❌ | Wybierz kategorię')
                .addOptions([
                    { label: 'Zakupy', value: 'zakupy', emoji: '🛒', description: 'Informacje o zakupach' },
                    { label: 'Płatności', value: 'platnosci', emoji: '💳', description: 'Metody płatności' },
                    { label: 'Scam?', value: 'scam', emoji: '❓', description: 'Czy to scam?' },
                    { label: 'Pomoc', value: 'pomoc', emoji: '🆘', description: 'Gdzie uzyskać pomoc' }
                ])
        );

        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('ticket_support')
                .setLabel('Otwórz ticket')
                .setEmoji('🎫')
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.channel.send({ embeds: [embed], components: [selectRow, buttonRow] });
        await interaction.reply({ content: '> **Wysłano panel FAQ!**', flags: 64 });
    }
};
