const { PermissionsBitField, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const Ticket = require('../models/Ticket');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Wystąpił błąd podczas wykonania tej komendy.', flags: 64 });
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId.includes('review_modal')) {
                // Obsługa modali recenzji
                const modal = client.modals.get('review_modal');
                if (modal) {
                    try {
                        await modal.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        await interaction.reply({ content: 'Wystąpił błąd podczas obsługi recenzji.', flags: 64 });
                    }
                }
            } else if (interaction.customId.includes('ticket')) {
                await interaction.deferReply({ephemeral: true});
                const name = interaction.customId.split('_');
                let ticketCategory = name.slice(1).join(' ');
                const formattedCategory = ticketCategory
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ');

                let embed, row, paymentEmbed;
                let paymentValue = null;
                let license = null;

                switch (ticketCategory) {
                    case 'support':
                        const supportReason = interaction.fields.getTextInputValue('reason');

                        embed = new EmbedBuilder()
                            .setDescription(`
## <:silent:1395058293432516658> Silent Maf1a × TICKET
### <:3861memberpurple:1384624101351620658> × ***Customer Informations:***
> <:3124memberwhiteblack:1384624130682519673> × **Ping:** ${interaction.member}
> <:3124memberwhiteblack:1384624130682519673> × **Nick:** ${interaction.user.username}
> <:3124memberwhiteblack:1384624130682519673> × **ID:** ${interaction.member.id}
### <:ogl:1382655256256843818> × ***Order Informations:***
> <:9847public:1384624242800459796> × Category: **${formattedCategory}**

> <:2141file:1384624277122449510> × Why you create a ticket: **${supportReason}**
                        `);
                        row = new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId('settings_support')
                                .setPlaceholder('❌ | Nie wybrałeś/aś żadnej opcji.')
                                .addOptions([
                                    {
                                        label: 'Przejmij',
                                        emoji: '<:43565member:1359180336214310916>',
                                        description: 'Jeśli chcesz przejąć ten ticket, kliknij tutaj.',
                                        value: 'claim'
                                    },
                                    {
                                        label: 'Zamknij',
                                        emoji: '<:emoji58:1365678186792489140>',
                                        description: 'Jeśli chcesz zamknąć ten ticket, kliknij tutaj.',
                                        value: 'close'
                                    },
                                    {
                                        label: 'Dodaj osobę',
                                        emoji: `<:3124memberwhiteblack:1384624130682519673>`,
                                        description: 'Jeśli chcesz dodać osobę do tego ticketu, kliknij tutaj.',
                                        value: 'adduser'
                                    },
                                    {
                                        label: 'Usuń osobę',
                                        emoji: `<:3124memberwhiteblack:1384624130682519673>`,
                                        description: 'Jeśli chcesz usunąć osobę z tego ticketu, kliknij tutaj.',
                                        value: 'removeuser'
                                    },
                                    {
                                        label: 'Powiadom',
                                        emoji: `<:emoji22:1365678264789635122>`,
                                        description: 'Jeśli chcesz powiadomić klienta, kliknij tutaj.',
                                        value: 'notify'
                                    }
                                ])
                        );
                        break;
                    case 'other':
                        const otherReason = interaction.fields.getTextInputValue('reason');

                        embed = new EmbedBuilder()
                            .setDescription(`
## <:silent:1395058293432516658> Silent Maf1a × TICKET
### <:3861memberpurple:1384624101351620658> × ***Customer Informations:***
> <:3124memberwhiteblack:1384624130682519673> × **Ping:** ${interaction.member}
> <:3124memberwhiteblack:1384624130682519673> × **Nick:** ${interaction.user.username}
> <:3124memberwhiteblack:1384624130682519673> × **ID:** ${interaction.member.id}
### <:ogl:1382655256256843818> × ***Order Informations:***
> <:9847public:1384624242800459796> × Category: **${formattedCategory}**

> <:2141file:1384624277122449510> × Why you create a ticket: **${otherReason}**
                        `);
                        break;
                    case 'steam':
                        const steamAmount = interaction.fields.getTextInputValue('amount');
                        const steamPayment = interaction.fields.getTextInputValue('payment');
                        paymentValue = steamPayment;

                        embed = new EmbedBuilder()
                            .setDescription(`
## <:silent:1395058293432516658> Silent Maf1a × TICKET
### <:3861memberpurple:1384624101351620658> × ***Customer Informations:***
> <:3124memberwhiteblack:1384624130682519673> × **Ping:** ${interaction.member}
> <:3124memberwhiteblack:1384624130682519673> × **Nick:** ${interaction.user.username}
> <:3124memberwhiteblack:1384624130682519673> × **ID:** ${interaction.member.id}
### <:ogl:1382655256256843818> × ***Order Informations:***
> <:9847public:1384624242800459796> × Category: **${formattedCategory}**

> <:2141file:1384624277122449510> × Amount: **${steamAmount}**
> <:2141file:1384624277122449510> × Payment: **${steamPayment}**
                        `);
                        break;
                    case 'fivem':
                        const fivemPayment = interaction.fields.getTextInputValue('payment');
                        paymentValue = fivemPayment;

                        embed = new EmbedBuilder()
                            .setDescription(`
## <:silent:1395058293432516658> Silent Maf1a × TICKET
### <:3861memberpurple:1384624101351620658> × ***Customer Informations:***
> <:3124memberwhiteblack:1384624130682519673> × **Ping:** ${interaction.member}
> <:3124memberwhiteblack:1384624130682519673> × **Nick:** ${interaction.user.username}
> <:3124memberwhiteblack:1384624130682519673> × **ID:** ${interaction.member.id}
### <:ogl:1382655256256843818> × ***Order Informations:***
> <:9847public:1384624242800459796> × Category: **${formattedCategory}**

> <:2141file:1384624277122449510> × Payment: **${fivemPayment}**
                        `);
                        break;
                    default:
                        license = interaction.fields.getTextInputValue('license');
                        const payment = interaction.fields.getTextInputValue('payment');
                        paymentValue = payment;

                        embed = new EmbedBuilder()
                            .setDescription(`
## <:silent:1395058293432516658> Silent Maf1a × TICKET
### <:3861memberpurple:1384624101351620658> × ***Customer Informations:***
> <:3124memberwhiteblack:1384624130682519673> × **Ping:** ${interaction.member}
> <:3124memberwhiteblack:1384624130682519673> × **Nick:** ${interaction.user.username}
> <:3124memberwhiteblack:1384624130682519673> × **ID:** ${interaction.member.id}
### <:ogl:1359180323715420312> × ***Order Informations:***
> <:9847public:1384624242800459796> × Category: **${formattedCategory}**

> <:2141file:1384624277122449510> × License: **${license}**
> <:2141file:1384624277122449510> × Payment: **${payment}**
                        `);
                        if (payment.toUpperCase() === 'BLIK') {
                            paymentEmbed = new EmbedBuilder()
                                .setDescription(`
# <:emoji22:1381995486277537914> Czesc!
-# Widze, ze placisz blikiem <:BLIK:1376266853118119946>, a wiec: 
> ***Przelej na numer:*** **\`577 774 646\`**
> ***Opis:*** \`Od [Nick]\`
- **Nastepnie napisz nam ze przelales i czekaj cierpliwie na swoj produkt <:legit:1348050426666156162>**
                                `)
                                .setColor('#6f21ff');
                        }
                        break;
                }

                let categoryID, roleID;
                switch (ticketCategory) {
                    case 'bundle':
                        categoryID = '1382630830802731036';
                        roleID = '1382630829561217079';
                        break;
                    case 'discord':
                        categoryID = '1382630830802731035';
                        roleID = '1382630829561217079';
                        break;
                    case 'fg':
                        categoryID = '1382630830802731034';
                        roleID = '1382630829561217079';
                        break;
                    case 'hx':
                        categoryID = '1382630830802731028';
                        roleID = '1382630829561217080';
                        break;
                    case 'ipvanish':
                        categoryID = '1382630830802731033';
                        roleID = '1382630829561217079';
                        break;
                    case 'keyser fortnite':
                        categoryID = '1399356793691570198';
                        roleID = '1382630829561217084';
                        break;
                    case 'ventiq fortnite':
                        categoryID = '1399356793691570198';
                        roleID = '1382630829561217079';
                        break;
                    case 'ventiq valorant':
                        categoryID = '1399356793691570198';
                        roleID = '1382630829561217079';
                        break;
                    case 'keyser':
                        categoryID = '1399356793691570198';
                        roleID = '1382630829561217084';
                        break;
                    case 'macho':
                        categoryID = '1382630830064668683';
                        roleID = '1382630829561217079';
                        break;
                    case 'macho temp':
                        categoryID = '1382630830064668683';
                        roleID = '1382630829561217079';
                        break;
                    case 'other':
                        categoryID = '1382630830064668688';
                        roleID = '1382630829561217085';
                        break;
                    case 'fivem':
                        categoryID = '1382630830802731030';
                        roleID = '1382630829561217082';
                        break;
                    case 'red':
                        categoryID = '1384612382822895786';
                        roleID = '1382630829561217079';
                        break;
                    case 'fivem red':
                        categoryID = '1384612382822895786';
                        roleID = '1382630829561217079';
                        break;
                    case 'tiago':
                        categoryID = '1384612382822895786';
                        roleID = '1382630829561217079';
                        break;
                    case 'macho':
                        categoryID = '1384612382822895786';
                        roleID = '1382630829561217079';
                        break;
                    case 'red temp':
                        categoryID = '1384612382822895786';
                        roleID = '1382630829561217079';
                        break;
                    case 'silent':
                        categoryID = '1382630830064668687';
                        roleID = '1382630829561217079';
                        break;
                    case 'steam':
                        categoryID = '1382630830802731032';
                        roleID = '1382630829561217079';
                        break;
                    case 'support':
                        categoryID = '1382630835576111175';
                        roleID = '1382630829552963591';
                        break;
                    case 'tiago':
                        categoryID = '1382630830064668686';
                        roleID = '1382630829561217083';
                        break;
                    case 'tiago temp':
                        categoryID = '1382630830064668686';
                        roleID = '1382630829561217083';
                        break;
                    case 'unicore':
                        categoryID = '1382630830064668682';
                        roleID = '1382630829573931008';
                        break;
                    case 'zefiro temp':
                        categoryID = '1384612000243650590';
                        roleID = '1382630829561217081';
                        break;
                    case 'susano':
                        categoryID = '1382630830064668684';
                        roleID = '1382630829561217079';
                        break;
                    case 'unicore-marvels':
                        categoryID = '1382630830064668682';
                        roleID = '1382630829573931008';
                        break;
                    case 'ventiq':
                        categoryID = '1399356793691570198';
                        roleID = '1382630829561217079';
                        break;
                }

                const permissionOverwrites = [
                    {id: interaction.guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel]},
                    {
                        id: interaction.member.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]
                    },
                    {
                        id: roleID,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]
                    }
                ];

                if (ticketCategory === 'support') {
                    permissionOverwrites.push({
                        id: '1382630829552963590',
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages]
                    });
                }

                let channelName;
                if (license) {
                    const period = license.toLowerCase().replace(/\s+/g, '');
                    channelName = `ticket-${interaction.user.username}-${period}`.toLowerCase();
                } else {
                    channelName = `ticket-${interaction.user.username}`.toLowerCase();
                }

                try {
                    const ticketChannel = await interaction.guild.channels.create({
                        name: channelName,
                        type: 0,
                        parent: categoryID,
                        permissionOverwrites: permissionOverwrites
                    });

                    await ticketChannel.fetch();

                    if (!row) {
                        row = new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId('settings')
                                .setPlaceholder('❌ | Nie wybrałeś/aś żadnej opcji.')
                                .addOptions([
                                    {
                                        label: 'Zamknij',
                                        emoji: '<:emoji58:1365678186792489140>',
                                        description: 'Jeśli chcesz zamknąć ten ticket, kliknij tutaj.',
                                        value: 'close'
                                    },
                                    {
                                        label: 'Dodaj osobę',
                                        emoji: `<:3124memberwhiteblack:1384624130682519673>`,
                                        description: 'Jeśli chcesz dodać osobę do tego ticketu, kliknij tutaj.',
                                        value: 'adduser'
                                    },
                                    {
                                        label: 'Usuń osobę',
                                        emoji: `<:3124memberwhiteblack:1384624130682519673>`,
                                        description: 'Jeśli chcesz usunąć osobę z tego ticketu, kliknij tutaj.',
                                        value: 'removeuser'
                                    },
                                    {
                                        label: 'Powiadom',
                                        emoji: `<:emoji22:1365678264789635122>`,
                                        description: 'Jeśli chcesz powiadomić klienta, kliknij tutaj.',
                                        value: 'notify'
                                    }
                                ])
                        );
                    }

                    const newTicket = new Ticket({
                        channelId: ticketChannel.id,
                        userId: interaction.member.id,
                        payment: paymentValue
                    });
                    await newTicket.save();

                    if (!embed) {
                        embed = new EmbedBuilder()
                            .setDescription('## <:silent:1395058293432516658> Silent Maf1a × TICKET')
                            .setColor('#6f21ff');
                    }

                    const content = '@everyone';

                    const botPerms = ticketChannel.permissionsFor(interaction.guild.members.me);
                    if (botPerms && botPerms.has(PermissionsBitField.Flags.SendMessages) && botPerms.has(PermissionsBitField.Flags.EmbedLinks)) {
                        try {
                            await ticketChannel.send({ content, embeds: [embed], components: [row] });
                            if (paymentEmbed) {
                                await ticketChannel.send({ embeds: [paymentEmbed] });
                            }
                        } catch (sendError) {
                            console.error('Error sending ticket embed:', sendError);
                        }
                    } else {
                        console.error('Missing permissions to send messages or embeds in ticket channel.');
                    }

                    await interaction.editReply({content: `* **Your ticket has been created!**\n## ${ticketChannel}`});
                } catch (error) {
                    console.error('Error creating ticket:', error);
                    await interaction.editReply({
                        content: '❌ **Error:** Failed to create ticket. Please try again or contact support.',
                        flags: 64
                    });
                }
            } else {
                const modal = client.modals.get(interaction.customId);
                if (!modal) return;

                try {
                    await modal.execute(interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({content: 'Wystąpił błąd podczas obsługi modala.', ephemeral: true});
                }
            }
        } else if (interaction.isButton()) {
            if (interaction.customId.includes('role')) {
                const name = interaction.customId.split('_');
                let roleName = name[1];

                let roleID;

                switch (roleName) {
                    case 'changelog':
                        roleID = '1382630829536182305';
                        break;
                    case 'content':
                        roleID = '1382630829536182304';
                        break;
                    case 'free-stuff':
                        roleID = '1382630829536182307';
                        break;
                    case 'other':
                        roleID = '1382630829536182308';
                        break;
                    case 'restocks':
                        roleID = '1382630829536182306';
                        break;
                }

                const member = interaction.member;
                if (!roleID) {
                    return interaction.reply({ content: '> Unknown role.', flags: 64 });
                }
                if (member.roles.cache.has(roleID)) {
                    await member.roles.remove(roleID);
                    await interaction.reply({ content: `> Role <@&${roleID}> has been removed.`, flags: 64 });
                } else {
                    await member.roles.add(roleID);
                    await interaction.reply({ content: `> Role <@&${roleID}> has been added.`, flags: 64 });
                }
            }
            if (interaction.customId.includes('ticket')) {
                const name = interaction.customId.split('_');
                let ticketCategory = name[1];

                const modal = new ModalBuilder()
                    .setCustomId(interaction.customId)
                    .setTitle('Creating Ticket');

                switch (ticketCategory) {
                    case 'support':
                    case 'other':
                        const reasonField = new TextInputBuilder()
                            .setCustomId('reason')
                            .setLabel('Why you create a ticket?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('Reason')
                            .setRequired(true);
                        modal.addComponents(
                            new ActionRowBuilder().addComponents(reasonField)
                        );
                        break;
                    case 'steam':
                        const amountField = new TextInputBuilder()
                            .setCustomId('amount')
                            .setLabel('Amount of accounts?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('[1, 2, 10]')
                            .setRequired(true);

                        const steamPaymentField = new TextInputBuilder()
                            .setCustomId('payment')
                            .setLabel('Your Payments?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('[all payments on #💳┃payments]')
                            .setRequired(true);
                        modal.addComponents(
                            new ActionRowBuilder().addComponents(amountField),
                            new ActionRowBuilder().addComponents(steamPaymentField)
                        );
                        break;
                    case 'fivem':
                        const fivemPaymentField = new TextInputBuilder()
                            .setCustomId('payment')
                            .setLabel('Your Payments?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('[all payments on #💳┃payments]')
                            .setRequired(true);
                        modal.addComponents(
                            new ActionRowBuilder().addComponents(fivemPaymentField)
                        );
                        break;
                    default:
                        const licenseField = new TextInputBuilder()
                            .setCustomId('license')
                            .setLabel('What type of license?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('[week, month, lifetime]')
                            .setRequired(true);

                        const paymentField = new TextInputBuilder()
                            .setCustomId('payment')
                            .setLabel('Your Payments?')
                            .setStyle(TextInputStyle.Short)
                            .setPlaceholder('[all payments on #💳┃payments]')
                            .setRequired(true);
                        modal.addComponents(
                            new ActionRowBuilder().addComponents(licenseField),
                            new ActionRowBuilder().addComponents(paymentField)
                        );
                }
                interaction.showModal(modal);

            } else if (interaction.customId.includes('review_ticket')) {
                // Obsługa buttonów recenzji
                const button = client.buttons.get('review');
                if (button) {
                    try {
                        await button.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        await interaction.reply({ content: 'Wystąpił błąd podczas obsługi recenzji.', flags: 64 });
                    }
                }
            } else if (interaction.customId.includes('ranking_')) {
                // Obsługa buttonów rankingu
                const button = client.buttons.get('ranking');
                if (button) {
                    try {
                        await button.execute(interaction);
                    } catch (error) {
                        console.error(error);
                        await interaction.reply({ content: 'Wystąpił błąd podczas obsługi rankingu.', flags: 64 });
                    }
                }
            } else {
                const button = client.buttons.get(interaction.customId);
                if (!button) return;

                try {
                    await button.execute(interaction);
                } catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'Wystąpił błąd podczas obsługi buttona.', flags: 64 });
                }
            }
        } else if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);
            if (!selectMenu) return;

            try {
                await selectMenu.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Wystąpił błąd podczas obsługi select menu.', flags: 64 });
            }
        }
    },
};
