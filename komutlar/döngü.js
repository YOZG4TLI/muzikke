const { QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "döngü",
    aliases: ["tekrar", "repeat", "loop"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        let mode = args[0];

        if (!mode)
            return message.reply({
                content: `${message.member} **Bir döngü modu belirtmelisin, örnek: \`/döngü <kuyruk/şarkı>\`**`
            });

        const queue = client.player.getQueue(message.guild);

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        if (mode === "kuyruk") {
            queue.setRepeatMode(QueueRepeatMode.QUEUE);

            if (!client.playlistloop[message.guild.id])
                client.playlistloop[message.guild.id] = "açık";
            else {
                if (client.playlistloop[message.guild.id] === "kapalı")
                    client.playlistloop[message.guild.id] = "açık";
                else client.playlistloop[message.guild.id] = "kapalı";
            }

            return message.reply({
                content: `${message.member} **\`Kuyruk\` için döngü artık \`${
                    client.playlistloop[message.guild.id]
                }\`** :white_check_mark:`
            });
        } else if (mode === "şarkı") {
            queue.setRepeatMode(QueueRepeatMode.TRACK);

            if (!client.trackLoop[message.guild.id]) client.trackLoop[message.guild.id] = "açık";
            else {
                if (client.trackLoop[message.guild.id] === "kapalı")
                    client.trackLoop[message.guild.id] = "açık";
                else client.trackLoop[message.guild.id] = "kapalı";
            }

            return message.reply({
                content: `${message.member} **\`Şarkı\` için döngü artık \`${
                    client.trackLoop[message.guild.id]
                }\`** :white_check_mark:`
            });
        } else
            return message.reply({
                content: `${message.member} **Yazdığın döngü modu geçersiz \`kuyruk/şarkı\`** :x:`
            });
    }
};
