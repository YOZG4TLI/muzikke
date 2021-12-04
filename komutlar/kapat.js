module.exports = {
    name: "kapat",
    aliases: ["stop"],
    execute: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply({
                content: `${message.member}` + " **Bir kanalda olmalısın** :x:"
            });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        if (!queue?.playing)
            return message.reply({ content: `${message.member}` + " **Birşey çalmıyor** :x:" });

        await queue.stop();
    }
};
