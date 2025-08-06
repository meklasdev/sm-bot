const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];

        let embed, selectRow;
        switch (selectedValue) {
            case 'fortnite_keyser':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402629014606057533/fn_vk3y.png?ex=68949b90&is=68934a10&hm=b096117531ff208ea0709b4d4ab20f196313f56ea3803a8ffe08e3c433374693&')
                    .setDescription(`
# <:keyser:1382655865521311825> K3yser Fortnite <:keyser:1382655865521311825>
<a:arrowpurple:1384626293139570781> ***description***
<a:Verified_Purple_Animated:1384626247702675456> - Instant Delivery
<a:Verified_Purple_Animated:1384626247702675456> - Undetected

# <a:arrowpurple:1384626293139570781> <:keyser:1382655865521311825>
- **1 Day - €9.99 / 42 PLN**
- **3 Day - €17.99 / 76 PLN**
- **Weekly - €31.99 / 136 PLN**
- **Lifetime - €65.99 / 280 PLN**

**<a:arrowpurple:1384626293139570781> <:applebank:1382655955787059301> - Payments: **[Click Click](https://discord.com/channels/1357977845695119360/1357979005198008421)
**<a:arrowpurple:1384626293139570781> <:legit:1384625637775507498> - Legit Checks:** [Vouches](https://discord.com/channels/1357977845695119360/1357979010184773642)  |  [Proofs](https://discord.com/channels/1357977845695119360/1357979009006436352)  | [Reviews](https://discord.com/channels/1357977845695119360/1359167618778534060)
**<a:arrowpurple:1384626293139570781> <:ogl:1382655256256843818> - Showcase:** [Click Click](https://www.youtube.com/watch?v=uNM3CKP3zmM&t=87s)
                    `);
                selectRow = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('fortnite_keyser_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'K3yser - €9.99 / 42 PLN',
                                description: '1 Day',
                                value: 'fortnite_keyser_1day'
                            },
                            {
                                label: 'K3yser - €17.99 / 76 PLN',
                                description: '3 Day',
                                value: 'fortnite_keyser_3day'
                            },
                            {
                                label: 'K3yser - €31.99 / 136 PLN',
                                description: 'Weekly',
                                value: 'fortnite_keyser_week'
                            },
                            {
                                label: 'K3yser - €65.99 / 280 PLN',
                                description: 'Lifetime',
                                value: 'fortnite_keyser_life'
                            }
                        ])
                );
                break;
            case 'fortnite_ventiq':
                embed = new EmbedBuilder()
                    .setColor('#6f21ff')
                    .setImage('https://cdn.discordapp.com/attachments/1388555378643566663/1402628906690805841/ventiq_fn.png?ex=68949b76&is=689349f6&hm=38f22f208c9b5da0628e1de23df6a0f2b019a324f57e115f9fed926a8327683b&')
                    .setDescription(`
# <:V_:1398725075334729840> Ventiq Fortnite <:V_:1398725075334729840>
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
                        .setCustomId('fortnite_ventiq_tickets')
                        .setPlaceholder('Select Product | Wybierz Produkt')
                        .addOptions([
                            {
                                label: 'Ventiq - €4.99 / 20 PLN',
                                description: '1 Day',
                                value: 'fortnite_ventiq_1day'
                            },
                            {
                                label: 'Ventiq - €29.99 / 127 PLN',
                                description: 'Weekly',
                                value: 'fortnite_ventiq_week'
                            },
                            {
                                label: 'Ventiq - €59.99 / 250 PLN',
                                description: 'Monthly',
                                value: 'fortnite_ventiq_month'
                            }
                        ])
                );
                break;
        }

        await interaction.reply({ embeds: [embed], components: [selectRow], flags: 64 });
    }
};
