const { QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "döngü",
    description: "Döngü modunu ayarlarsınız.",
    options: [
        {
            name: "mod",
            description: "Döngünün modunu belirlersiniz.",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "kuyruk",
                    value: "kuyruk"
                },
                {
                    name: "şarkı",
                    value: "şarkı"
                }
            ]
        }
    ],
    execute: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.reply({
                content: `${interaction.member}` + " **Bir kanalda olmalısın** :x:",
                ephemeral: true
            });

        let mode = interaction.options.getString("mod");

        const queue = client.player.getQueue(interaction.guild);

        if (!queue?.playing)
            return interaction.reply({
                content: `${interaction.member}` + " **Birşey çalmıyor** :x:",
                ephemeral: true
            });

        if (mode === "kuyruk") {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);

            if (!client.playlistloop[interaction.guild.id])
                client.playlistloop[interaction.guild.id] = "açık";
            else {
                if (client.playlistloop[interaction.guild.id] === "kapalı")
                    client.playlistloop[interaction.guild.id] = "açık";
                else client.playlistloop[interaction.guild.id] = "kapalı";
            }

            return interaction.reply({
                content: `${interaction.member} **\`Kuyruk\` için döngü artık \`${
                    client.playlistloop[interaction.guild.id]
                }\`** :white_check_mark:`,
                ephemeral: true
            });
        } else if (mode === "şarkı") {
            queue.setRepeatMode(QueueRepeatMode.TRACK);

            if (!client.trackLoop[interaction.guild.id])
                client.trackLoop[interaction.guild.id] = "açık";
            else {
                if (client.trackLoop[interaction.guild.id] === "kapalı")
                    client.trackLoop[interaction.guild.id] = "açık";
                else client.trackLoop[interaction.guild.id] = "kapalı";
            }

            return interaction.reply({
                content: `${interaction.member} **\`Şarkı\` için döngü artık \`${
                    client.trackLoop[interaction.guild.id]
                }\`** :white_check_mark:`,
                ephemeral: true
            });
        }
    }
};
