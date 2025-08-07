const { buildPanel } = require('../../commands/products');

module.exports = {
    async execute(interaction) {
        const category = interaction.values[0];
        const { embed, row } = buildPanel(category);

        if (!embed || !row) {
            return interaction.reply({ content: 'Nieprawidłowa kategoria.', ephemeral: true });
        }

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
};
