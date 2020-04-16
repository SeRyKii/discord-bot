const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json')
client.on('ready', () => {

    client.channels.cache.get(settings.servers[0].ids.channelid).send("Server");
})

client.login(settings.token)