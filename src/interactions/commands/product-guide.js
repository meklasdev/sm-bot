const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../../config/reviewConfig');

module.exports = {
    name: 'product-guide',
    description: 'Wysyła panel przewodnika produktów z kategoriami.',
    async execute(interaction) {
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription('## <:silent:1395058293432516658> Product Guide\nSelect a category to view product guides.')
            .setColor('#6f21ff')
            .setImage('https://media.discordapp.net/attachments/1382631010902212662/1393347920409006351/get_guide.png?ex=68951edf&is=6893cd5f&hm=01af443061ef612ca50eb65d9bab591bfdaf463b9fe9568ca55c2d4ac02efe86&=&format=webp&quality=lossless');

        const selectRow = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('product_guide')
                .setPlaceholder('Select Category | Wybierz kategorię')
                .addOptions([
                    {
                        label: 'Ch33ts',
                        value: 'fivem',
                        emoji: { id: '1402937925607493728', name: 'Fivem' },
                        description: 'View FiveM product guides'
                    },
                    {
                        label: 'Sp00fers',
                        value: 'spoofer',
                        emoji: { id: '1217919914363457566', name: 'fivem' },
                        description: 'View spoofer guides'
                    },
                    {
                        label: 'Premium',
                        value: 'premium',
                        emoji: { id: '1382655702606151680', name: 'Rockstar' },
                        description: 'View premium guides'
                    },
                    {
                        label: 'Bundle',
                        value: 'bundle',
                        emoji: { id: '1382655741986471946', name: 'bundle' },
                        description: 'View bundle guides'
                    }
                ])
        );

        await interaction.channel.send({ embeds: [embed], components: [selectRow] });
        await interaction.reply({ content: '> **Wysłano panel przewodnika produktów!**', flags: 64 });
    }
};
