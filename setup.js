const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json')
client.on('ready', () => {
    for (i = 0; i < settings.servers.length; i++) {
        client.channels.cache.get(settings.servers[i].ids.channelid).send("Server status");
    }
})

client.login(settings.token)
