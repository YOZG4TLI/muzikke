const { ZucarClient, ZucarHandler } = require("zucar-framework");
const online = require('./online.js')
const config = require("./config.json");
const { Player } = require("discord-player");
const client = new ZucarClient(
    {
        prefixs: config.prefixler,
        owners: config.sahipler
    },
    {
        intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
    }
);
const Handler = new ZucarHandler(client);
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    },
    leaveOnEmpty: false
});

client.player.on("trackStart", (queue, track) => {
    queue.metadata.channel.send({ content: `**🎶 | Şu anda çalınıyor: \`${track.title}\`**` });
});

client.player.on("queueEnd", (queue) => {
    queue.metadata.channel.send({ content: `🎶 | **Şarkı kuyruğu bitti.**` });
});

client.player.on("trackAdd", (queue, track) => {
    queue.metadata.channel.send({
        content: `**🎶 | Kuyruğa eklendi: \`${track.title}\`**`
    });
});

client.playlistloop = {};
client.trackLoop = {};

Handler.eventHandler({ directory: "eventler" });
Handler.slashCommandHandler({ directory: "slashKomutlar" });
Handler.commandHandler({ directory: "komutlar" }).then((commandNames) => {
    commandNames.forEach((commandName) => {
        console.log(`Komut yüklendi: ${commandName}`);
    });
});

Handler.on("commandOwnerOnly", (message) => {
    message.reply({ content: "Bu komutu sadece sahibim kullanabilir :x:" });
});

Handler.on("slashCommandOwnerOnly", (interaction) => {
    interaction.reply({
        content: "Bu komutu sadece sahibim kullanabilir :x:",
        ephemeral: true
    });
});

Handler.on("eventLoadError", (eventName, error) => {
    console.log(error);
});

Handler.on("slashCommandError", (interaction, commandName, error) => {
    console.log(error);
});

Handler.on("commandError", (message, commandName, error) => {
    console.log(error);
});

Handler.on("commandUserPermissions", (message, permissionsArray) => {
    let perms = permissionsArray.join(", ");
    message.reply({ content: `Bunun için şu yetkilere sahip olmalısın: ${perms}` });
});

Handler.on("commandClientPermissions", (message, permissionsArray) => {
    let perms = permissionsArray.join(", ");
    message.reply({ content: `Bunun için şu yetkilere sahip olmalıyım: ${perms}` });
});

Handler.on("slashCommandUserPermissions", (interaction, permissionsArray) => {
    let perms = permissionsArray.join(", ");
    interaction.reply({ content: `Bunun için şu yetkilere sahip olmalısın: ${perms}` });
});

Handler.on("slashCommandClientPermissions", (interaction, permissionsArray) => {
    let perms = permissionsArray.join(", ");
    interaction.reply({ content: `Bunun için şu yetkilere sahip olmalıyım: ${perms}` });
});

Handler.on("slashCommandsSetted", () => {
    console.log("Slash komutları hazır!");
});

Handler.on("slashCommandsNotSetted", (error) => {
    console.log(error);
});

client.login(process.env.token);
