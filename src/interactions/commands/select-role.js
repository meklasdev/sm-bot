const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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
## Select your role to receive only specific pings @
> <:ogl:1359180323715420312> **Other Pings** ***(not as important as everyone)***
> <:legit:1358050707139330050> **Free Stuff** ***(free ch33ats and others)***
> <:Stock:1362039382105784430> **Restocks** ***(all product restocks)***
> 🗒️ **Changelog** ***(all new changes)***
> <:46299videocreator:1359069273775145000>  **Content** ***(new media videos)***
            `)
            .setColor('#6f21ff')
            .setImage(`https://cdn.discordapp.com/attachments/1382630836171706431/1384617175574249584/image.png?ex=685314bb&is=6851c33b&hm=096dbba5e0daa8e41484e458a52ed0a3aa2906eb5c7d15d43434508ad0be7679&`);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('role_other')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('<:ogl:1359180323715420312>'),
            new ButtonBuilder()
                .setCustomId('role_free-stuff')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('<:legit:1358050707139330050>'),
            new ButtonBuilder()
                .setCustomId('role_restocks')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('<:Stock:1362039382105784430>'),
            new ButtonBuilder()
                .setCustomId('role_changelog')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🗒️'),
            new ButtonBuilder()
                .setCustomId('role_content')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('<:46299videocreator:1359069273775145000>')
        );

        interaction.channel.send({embeds: [embed], components: [row]});
        interaction.reply({ content: '> **Wysłano select role panel.**', flags: 64 });
    }
};
