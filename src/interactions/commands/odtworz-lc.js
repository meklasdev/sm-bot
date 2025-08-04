const LegitCheck = require('../../models/LegitCheck');

const config = require('../../config/reviewConfig');

module.exports = {
    name: 'odtworz-lc',
    description: 'Odtwarza kopie legitchecków przez webhook.',

    execute: async (interaction) => {
        

        if (!config.ALLOWED_COMMAND_USERS.includes(interaction.user.id)) {
            return interaction.reply({ content: '**Nie masz uprawnień do wykonania tej komendy.**', flags: 64 });
        }

        await interaction.deferReply({ flags: 64 });
        let webhook;

        try {
            const vouches = await LegitCheck.find({}).sort({ createdAt: 'asc' });
            const total = vouches.length;

            if (total === 0) {
                return interaction.editReply('Brak vouchy w bazie danych do odtworzenia.');
            }

            webhook = await interaction.channel.createWebhook({
                name: 'Odtwarzanie Vouchy',
                avatar: interaction.client.user.displayAvatarURL(),
            });

            let count = 0;
            for (const vouch of vouches) {
                await webhook.send({
                    content: vouch.content,
                    username: vouch.authorUsername,
                    avatarURL: vouch.authorAvatarURL,
                });
                count++;
                if (count % 5 === 0 || count === total) {
                    await interaction.editReply(`Trwa odtwarzanie... Odtworzono ${count}/${total} vouchy.`);
                }
            }

            await interaction.editReply(`\`✅\` Pomyślnie odtworzono ${total} vouchy!`);

        } catch (error) {
            console.error('Błąd podczas odtwarzania vouchy:', error);
            await interaction.editReply('\`❌\` Wystąpił błąd podczas otwarzania vouchy.');
        } finally {
            if (webhook) {
                await webhook.delete('Zakończono zadanie odtwarzania.').catch(err => {
                    console.error("Nie udało się usunąć tymczasowego webhooka:", err);
                });
            }
        }
    }
};
