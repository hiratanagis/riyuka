const Discord = require("discord.js"); 

module.exports.run = async (client, message, args, color, prefix, lang) => { 
const m = await message.channel.send(':ping_pong: Ping?');
//await message.delete(m);
let E = new Discord.RichEmbed() 
.setTitle("Pong! ⏱") 
.setColor(color)
.addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true) 
.addField("API Latency", `${Math.round(client.ping)}ms`, true) 

return message.channel.send(lang.please_wait).then(async msg => {
                        setTimeout(() => {
                            msg.edit(E);
 //                         msg.delete(m);
                        }, 2000); 
        });

  } 

  exports.conf = {
    aliases: ["peng", "pung"],
    cooldown: "0"
  }
exports.help = {
    name: 'ping',
    description: 'See Ping Bot',
usage: "ping",
  example: 'ping'
}
