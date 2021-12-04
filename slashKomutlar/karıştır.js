module.exports = {
    name: "karıştır",
    description: "Kuyruğu karıştırırsınız.",
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        await queue.shuffle();

        return interaction.reply({
            content: `${interaction.member} **Kuyruk başarıyla karıştırıldı :white_check_mark:**`,
            ephemeral: true
        });
    }
};
