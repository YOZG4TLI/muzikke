module.exports = {
    name: "temizle",
    description: "Kuyruğu temizlersiniz.",
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                epehemral: true
            });

        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                epehemral: true
            });

        await queue.clear();

        return interaction.reply({
            content: `${interaction.member} **Kuyruk başarıyla temizlendi :white_check_mark:**`,
            epehemral: true
        });
    }
};
