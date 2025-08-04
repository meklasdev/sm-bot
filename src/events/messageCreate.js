const { EmbedBuilder } = require('discord.js');
const channelIds = ['1382630833000812598', '1382630834875535365'];
const config = require('../config/reviewConfig');

const LegitCheck = require('../models/LegitCheck');

module.exports = {
    name: "messageCreate",
    async execute(message) {
        if (message.author.bot) return;

        if (message.channel.id === '1382630833000812599') {
            if (!message.content.includes('+rep')) return message.delete();

            try {
                const newLegitCheck = new LegitCheck({
                    messageId: message.id,
                    authorUsername: message.author.username,
                    authorAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
                    content: message.content,
                });

                await newLegitCheck.save();
            } catch (error) {
                console.error('Błąd podczas zapisywania legit checka:', error);
            }

            const stickyEmbed = new EmbedBuilder()
                .setDescription(`
**<a:Verified_Purple_Animated:1384626247702675456>︲JAK NAPISAĆ LEGIT CHECKA?**
**Wzór:**
> - \`\`+rep @sprzedawca [ilość] [produkt] [cena] PLN\`\`
**Przykład**
> - +rep @Julus 1 Month Tiago
                `)
                .setColor('#6f21ff');

            const fiveMessages = await message.channel.messages.fetch({ limit: 5 });

            const botMessages = fiveMessages.filter(m => m.author.id === message.client.user.id);
            for (const msg of botMessages.values()) {
                try {
                    await msg.delete();
                } catch (error) {
                    console.error('[messageCreate] Błąd podczas usuwania wiadomości bota:', error.message);
                }
            }

            await message.channel.send({
                embeds: [stickyEmbed]
            });
        }

        if (message.author.id === config.MESSAGE_CREATE_IGNORE_ID) return;
        if (channelIds.includes(message.channel.id)) {
            await message.delete().catch(error => console.error('[messageCreate] Nie udało się usunąć wiadomości:', error.message));
        }
    }
}
