const Discord = require("discord.js");
const client = new Discord.Client();
const Gamedig = require('gamedig');
const settings = require('./settings.json');
global.finalembed = "";
client.on('ready', () => {
    console.log("Logged in as " + client.user.tag);
    console.log("Loading presence. Presence settings: " + JSON.stringify(settings.presence))
    client.user.setPresence({ game: { name: settings.presence.name, type: settings.presence.type }, status: settings.presence.status })
    function getserverinfo(ip, port, title, description, thumbnail, color, type) {
        Gamedig.query({
            type: type,
            host: ip,
            port: port,
            attemptTimeout: 5000,
            maxAttempts: 2
        }).then((state) => {
            let temparray = [];
            for (i = 0; i < state.players.length; i++) {
                temparray.push(state.players[i].name + '(' + state.players[i].score + ')')
            }

            if (temparray.length == 0) temparray.push('EMPTY');
            var exampleEmbed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(title)
                .setDescription(description)
                .setThumbnail(thumbnail)
                .addField('Status', 'ONLINE')
                .addField('Name', state.name, true)
                .addField('Map', state.map, true)
                .addField('Player count', state.players.length + " out of " + state.maxplayers, true)
                .addField('Player(Score)', temparray.join('\n'),true)
                .addField('Game', state.raw.game, true)
                .addField('Version', state.raw.version, true)
                .addField('Ping', state.ping + "MS", true)
                .addField('Connect', state.connect, true)
                .setTimestamp();
            temparray = [];
            global.finalembed = exampleEmbed;
        }).catch((error) => {
            console.log(error)
            var exampleEmbed2 = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(title)
                .setDescription(description)
                .setThumbnail(thumbnail)
                .addField('Status', 'OFFLINE')
                .addField('Name', 'OFFLINE', true)
                .addField('Map', 'OFFLINE', true)
                .addField('Player count', 'OFFLINE', true)
                .addField('Player(Score)', 'OFFLINE',true)
                .addField('Game', 'OFFLINE', true)
                .addField('Version', 'OFFLINE', true)
                .addField('Ping', 'OFFLINE', true)
                .addField('Connect', 'OFFLINE', true)
                .setTimestamp();
            temparray = [];
            global.finalembed = exampleEmbed;
        });
    }


    setInterval(function () {
        for (i = 0; i < settings.servers.length; i++) {
            getserverinfo(settings.servers[i].ip, settings.servers[i].port, settings.servers[i].customizables.title, settings.servers[i].customizables.description, settings.servers[i].customizables.thumbnail, settings.servers[i].customizables.color, settings.servers[i].gametype)
            client.channels.cache.get(settings.servers[i].ids.channelid).messages.fetch(settings.servers[i].ids.messageid).then((msg)=>{msg.edit(global.finalembed)})

        }
    }, settings.timeout);
});

client.login(settings.token);