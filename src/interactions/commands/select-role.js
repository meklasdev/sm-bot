const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'select-role',
    description: 'Send select role panel.',

    execute: async (interaction) => {
        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: 'Nie masz uprawnień do wykonania tej komendy.', flags: 64 });
        }

        const embed = new EmbedBuilder()
            .setDescription(`
## Select your role to receive only specific pings
> <:legit:1358050707139330050> **Free Stuff**
> <:46299videocreator:1359069273775145000> **Content**
> 🛒 **Customer**
> <:ogl:1359180323715420312> **Other Pings**
            `)
            .setColor('#6f21ff')
            .setImage('https://cdn.discordapp.com/attachments/1382630836171706431/1384617175574249584/image.png?ex=685314bb&is=6851c33b&hm=096dbba5e0daa8e41484e458a52ed0a3aa2906eb5c7d15d43434508ad0be7679&');

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('role_select')
                .setPlaceholder('❌ × Click to select | Kliknij aby wybrać')
                .setMinValues(0)
                .setMaxValues(4)
                .addOptions([
                    {
                        label: 'Free Stuff',
                        value: 'free',
                        emoji: '<:legit:1358050707139330050>'
                    },
                    {
                        label: 'Content',
                        value: 'content',
                        emoji: '<:46299videocreator:1359069273775145000>'
                    },
                    {
                        label: 'Customer',
                        value: 'customer',
                        emoji: '🛒'
                    },
                    {
                        label: 'Other Pings',
                        value: 'other',
                        emoji: '<:ogl:1359180323715420312>'
                    }
                ])
        );

        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: '> **Wysłano select role panel.**', flags: 64 });
    }
};
