const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config/reviewConfig');

module.exports = {
    name: 'product-guide',
    description: 'Wysyła panel przewodnika produktów z kategoriami.',
    async execute(interaction) {
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription('## <:silent:1395058293432516658> Product Guide\nWybierz kategorię, aby zobaczyć produkty.')
            .setColor('#6f21ff');

        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('product_guide')
                .setPlaceholder('❌ | Wybierz kategorię')
                .addOptions([
                    { label: 'Cheats – FiveM', value: 'fivem', emoji: '🎮', description: 'Cheaty do FiveM' },
                    { label: 'Spoofers – FiveM', value: 'spoofer', emoji: '🛡️', description: 'Spoofery do FiveM' },
                    { label: 'Premium', value: 'premium', emoji: '💎', description: 'Usługi premium' },
                    { label: 'Bundle/VPN', value: 'bundle', emoji: '📦', description: 'Pakiety i VPN' }
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
        await interaction.reply({ content: '> **Wysłano panel przewodnika produktów!**', flags: 64 });
    }
};
