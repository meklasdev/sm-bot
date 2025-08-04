const mongoose = require("mongoose");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Połączono z bazą danych MongoDB!');
            })
            .catch((err) => {
                console.error('Błąd połączenia z bazą danych MongoDB:', err);
                process.exit(1);
            });

        console.log(`Zalogowano jako ${client.user.tag}`);
        console.log(`Autor: @ufogam3r`);

        await require('../handlers/commandHandler')(client);
        require('../handlers/interactionHandler')(client);
    },
};
