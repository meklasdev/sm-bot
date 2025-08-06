const { PermissionsBitField, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Ticket = require('../../../models/Ticket');

module.exports = {
    async execute(interaction) {
        const selectedValue = interaction.values[0];
        const member = interaction.member;
        const allowedRoleIds = ['1382630829536182310', '1382630829552963591', '1382630829552963590'];

        const hasPermission = member.roles.cache.some(role => allowedRoleIds.includes(role.id));

        if (!hasPermission) {
            return interaction.reply({
                content: '> **Nie masz uprawnień do wejścia w ustawienia tego ticketa.**',
                flags: 64
            });
        }

        const ticketChannel = interaction.channel;
        const ticketData = await Ticket.findOne({ channelId: ticketChannel.id });

        switch (selectedValue) {
            case 'claim':
                await interaction.deferUpdate();
                if (ticketData.status === 'claimed') {
                    return interaction.followUp({
                        content: '> **Ticket is already claimed!**',
                        flags: 64
                    });
                }
                const channelNameParts = ticketChannel.name.split('-');
                const clientNick = channelNameParts[1]; // gracz jest na pozycji 1 (ticket-gracz-...)
                await ticketChannel.setName(`${clientNick}-${member.user.username}`);

                ticketData.status = 'claimed';
                ticketData.claimedBy = member.id;
                await ticketData.save();

                await ticketChannel.permissionOverwrites.create(member.id, {
                    ViewChannel: true
                });

                await ticketChannel.permissionOverwrites.create('1382630829552963591', {
                    ViewChannel: false
                });

                await ticketChannel.permissionOverwrites.create('1382630829552963590', {
                    ViewChannel: false
                });

                const claimEmbed = new EmbedBuilder()
                    .setDescription(`* **Ticket has been claimed by** ${member}`)
                    .setColor('#6f21ff');

                await interaction.channel.send({embeds: [claimEmbed]})
                await interaction.editReply({content: '> **Ticket has been claimed**'});

                break;
            case 'close':
                await ticketChannel.permissionOverwrites.set([
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                ]);

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('open')
                        .setLabel('Open')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger)
                );

                interaction.reply({content: `> * **Ticket has been closed**`, flags: 64});
                interaction.channel.send({components: [row]})
                break;
            case 'adduser':
                const adduserModal = new ModalBuilder()
                    .setCustomId('adduser_modal')
                    .setTitle('Dodawanie użytkownika');

                const adduserField = new TextInputBuilder()
                    .setCustomId('id')
                    .setLabel('ID UŻYTKOWNIKA:')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                adduserModal.addComponents(
                    new ActionRowBuilder().addComponents(adduserField),
                );
                interaction.showModal(adduserModal);
                break;
            case 'removeuser':
                const removeuserModal = new ModalBuilder()
                    .setCustomId('removeuser_modal')
                    .setTitle('Dodawanie użytkownika');

                const removeuserField = new TextInputBuilder()
                    .setCustomId('id')
                    .setLabel('ID UŻYTKOWNIKA:')
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                removeuserModal.addComponents(
                    new ActionRowBuilder().addComponents(removeuserField),
                );
                interaction.showModal(removeuserModal);
                break;
            case 'notify':
                await interaction.deferReply({ flags: 64 });
                const client = await interaction.guild.members.fetch(ticketData.userId);

                const embed = new EmbedBuilder()
                    .setDescription(`
## <:pngsm:1362725414153355559> Silent Maf1a × MESSAGE
> <:support:1358051188758806579> × ${client} **You are called to your ticket!**
> <:hidepozdro:1358051265011126282> × **You have __48 hours__ to reply or your ticket will be deleted.**
# 📌 CHANNEL: ${interaction.channel}
            `)
                    .setColor(`#6f21ff`);

                try {
                    await client.send({embeds: [embed]});
                    interaction.editReply({content: `> Wiadomość do ${client} została wysłana!`});
                } catch (error) {
                    interaction.editReply({content: `> Wiadomość do ${client} __nie__ została wysłana!`});
                }
                break;
        }
    }
}