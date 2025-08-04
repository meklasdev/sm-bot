const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const ticketId = interaction.customId.split('_')[2]; // review_ticket_ID
        
        const modal = new ModalBuilder()
            .setCustomId(`review_modal_${ticketId}`)
            .setTitle('⭐ Oceń Support');

        const ratingField = new TextInputBuilder()
            .setCustomId('rating')
            .setLabel('Ocena (1-5 gwiazdek)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Wpisz liczbę od 1 do 5')
            .setMaxLength(1)
            .setMinLength(1)
            .setRequired(true);

        const commentField = new TextInputBuilder()
            .setCustomId('comment')
            .setLabel('Komentarz (opcjonalnie)')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Napisz swoją opinię o otrzymanej pomocy...')
            .setMaxLength(500)
            .setRequired(false);

        modal.addComponents(
            new ActionRowBuilder().addComponents(ratingField),
            new ActionRowBuilder().addComponents(commentField)
        );

        await interaction.showModal(modal);
    }
};