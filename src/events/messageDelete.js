const LegitCheck = require('../models/LegitCheck');

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        if (message.channel.id !== '1382630833000812599') return;

        try {
            const deletedVouch = await LegitCheck.findOneAndDelete({ messageId: message.id });

            if (deletedVouch) {
                console.log(`Usunięto vouch z bazy danych, ponieważ wiadomość (ID: ${message.id}) została skasowana z kanału.`);
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas próby usunięcia voucha z bazy danych:', error);
        }
    }
};