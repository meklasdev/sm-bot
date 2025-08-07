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
            .setColor('#6f21ff')
            .setImage('https://media.discordapp.net/attachments/1382630836171706431/1384617324581228687/image.png?ex=6895a89f&is=6894571f&hm=ae510f591f5c2c029f57bfb7c7c146709094693e3927ac851967475596c33cf5&=&format=webp&quality=lossless');

        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('faq')
                .setPlaceholder('Wybierz kategorię')
                .addOptions([
                    { label: 'Czy to scam?', value: 'scam', emoji: { id: '1384625637775507498', name: 'legit' }, description: 'Czy to nie scam?' },
                    { label: 'Kiedy produkt?', value: 'delivery', emoji: { id: '1384618944916357260', name: 'gift_icon' }, description: 'Kiedy dostanę zakupiony produkt?' },
                    { label: 'Gdzie PSC?', value: 'psc', emoji: { id: '1382655079420792922', name: 'psc' }, description: 'Gdzie zapłacić PSC?' },
                    { label: 'Tutoriale', value: 'tutorial', emoji: { id: '1384624277122449510', name: '2141file' }, description: 'Gdzie znaleźć tutoriale?' }
                ])
        );

        const buttonRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('ticket_support')
                .setLabel('Otwórz ticket')
                .setEmoji({ id: '1401226055867433041', name: 'ticket' })
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.channel.send({ embeds: [embed], components: [selectRow, buttonRow] });
        await interaction.reply({ content: '> **Wysłano panel FAQ!**', flags: 64 });
    }
};
