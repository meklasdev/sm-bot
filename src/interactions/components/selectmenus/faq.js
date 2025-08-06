const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const value = interaction.values[0];
        const embed = new EmbedBuilder().setColor('#6f21ff');

        switch (value) {
            case 'zakupy':
                embed.setTitle('🛒 Zakupy').setDescription('**Jak kupić produkt?**\n- Wejdź na stronę i wybierz ofertę.\n- Postępuj zgodnie z instrukcjami po zakupie.');
                break;
            case 'platnosci':
                embed.setTitle('💳 Płatności').setDescription('**Jakie metody płatności są dostępne?**\n- Przelew bankowy\n- Karta\n- Kryptowaluty');
                break;
            case 'scam':
                embed.setTitle('❓ Scam?').setDescription('**Czy Silent Mafia to scam?**\n- Nie. Posiadamy liczne pozytywne opinie i dowody.');
                break;
            case 'pomoc':
                embed.setTitle('🆘 Pomoc').setDescription('**Potrzebujesz pomocy?**\n- Otwórz ticket za pomocą przycisku poniżej.');
                break;
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
