const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, selectRow;
        switch (selectedValue) {
            case 'valorant_ventiq':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402628906342809650/valorant_ventiq.png?ex=68949b76&is=689349f6&hm=7cd6e225c969cfbf666fabacc8161ba088de0b3c46106118f5b85431a8b6fb5c&')
                    .setDescription(`
# <:V_:1398725075334729840> Ventiq Valorant <:V_:1398725075334729840>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1382655410795843695> - Instant Delivery
<a:Verified_Purple_Animated:1382655410795843695> - Undetected

# <a:arrowpurple:1384626293139570781> <:V_:1398725075334729840>
- **1 Day - €4.99 / 20 PLN**
- **Weekly - €29.99 / 127 PLN**
- **Monthly - €59.99 / 250 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase:** [Click Click](https://www.youtube.com/watch?v=dF-iBnFsO-U)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('valorant_ventiq_tickets')
                        .setPlaceholder('Select Product to Open Ticket | Wybierz Produkt aby otworzyć ticket')
                        .addOptions([
                            {
                                label: 'Ventiq - €4.99 / 20 PLN',
                                description: '1 Day',
                                value: 'valorant_ventiq_1day'
                            },
                            {
                                label: 'Ventiq - €29.99 / 127 PLN',
                                description: 'Weekly',
                                value: 'valorant_ventiq_week'
                            },
                            {
                                label: 'Ventiq - €59.99 / 250 PLN',
                                description: 'Monthly',
                                value: 'valorant_ventiq_month'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], flags: 64 });
    }
};
