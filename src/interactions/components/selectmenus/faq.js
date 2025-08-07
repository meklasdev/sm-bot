const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const value = interaction.values[0];
        const embed = new EmbedBuilder().setColor('#6f21ff');

        const footer = `\n\n### <:ticket:1401226055867433041> Dalej nie wiesz?\n<a:arrowpurple:1384626293139570781> Masz problem? Nie wiesz, co zrobić? Otwórz ticket Support na [https://canary.discord.com/channels/1382630829536182302/1382630832510074943](https://canary.discord.com/channels/1382630829536182302/1382630832510074943)!\n<a:arrowpurple:1384626293139570781> **Nasz support jest dostępny 24/7 i pomoże Ci w każdej sprawie!**\n<a:arrowpurple:1384626293139570781> Potrzebujesz pomocy z zakupem?\n<a:arrowpurple:1384626293139570781> Masz problem z instalacją?\n<a:arrowpurple:1384626293139570781> Chcesz zapłacić PSC?\n<a:arrowpurple:1384626293139570781> **Otwórz Ticketa i czekaj na support!**`;

        switch (value) {
            case 'scam':
                embed.setDescription(`### <:legit:1384625637775507498> Czy to nie scam?\n<a:arrowpurple:1384626293139570781> **Jestesmy oficjalnymi resellerami zweryfikowanymi produktów sprzedawanych przez nas więc**\n**nie ma żadnej szansy na oszustwo!**\n<a:arrowpurple:1384626293139570781> Oczywiście wiele legit checków też posiadamy na --> [link](https://discord.com/channels/1382630829536182302/1382630833000812597) oraz [link](https://discord.com/channels/1382630829536182302/1382630833000812599)` + footer);
                break;
            case 'delivery':
                embed.setDescription(`### <:gift_icon:1384618944916357260> Kiedy dostane zakupiony produkt?\n<a:arrowpurple:1384626293139570781> **Natychmiast** po zakupie na stronie, lub na ticketcie.` + footer);
                break;
            case 'psc':
                embed.setDescription(`### <:psc:1382655079420792922> Gdzie mogę zapłacić PSC?\n<a:arrowpurple:1384626293139570781> **Na tickecie!** Poczekaj, aż ktoś przejmie Twoje zgłoszenie.` + footer);
                break;
            case 'tutorial':
                embed.setDescription(`### <:2141file:1384624277122449510> Gdzie mogę znaleźć tutorial do Keysera lub innych rzeczy?\n<a:arrowpurple:1384626293139570781> **Wszystko zawsze znajdziesz u nas na kanale julus!** Są tam tutoriale do wszystkiego, krok po kroku – od instalacji po korzystanie.` + footer);
                break;
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};
