# About
This bot uses embed and gamedig module to edit and display status and players from gameserver.

Gamedig:
- [npm](https://www.npmjs.com/package/gamedig)
- [Github](https://github.com/sonicsnes/node-gamedig#readme)

#### Currently bot is supporting
```
Most of valve games (games based on source engine):
CS:GO
TF2
Etc.

Bot will be updated to make it support other games.
```


## How to setup bot
First what we are gonna need is to send message to channel via bot. To do this we are gonna add bot to server, edit `settings.json` 
and replace `"channelid": "id"` to `"channelid": "yourchannelid"` (replace yourchannelid with channel id),  then 
we need to run setup code, we go to cmd, navigate to folder with this project using `cd` command, and run `node setup.js` 
command. Now bot should send message to this channel. Now we need to edit `settings.js` once more and fillout 
remaining fields (remember token). Then we run `node index.js` and bot should edit message 20 seconds after startup.

## How to add more gameserver messages
We need to copy template:
```
{
   "ids":{
      "channelid":"id",
      "messageid":"id"
   },
   "ip":"ip",
   "port":"port",
   "customizables":{
      "title":"title",
      "description":"description",
      "thumbnail":"thumbnail",
      "color":"FFFFFF"
   }
}
```
and add it to servers array (remember to add comma before), fill out `"channelid": "id"`, then edit setup.js and change 
`client.channels.cache.get(settings.servers[0].ids.channelid).send("Server");` to `client.channels.cache.get(settings.servers[1].ids.channelid).send("Server");`, then run it using `node setup.js`.
