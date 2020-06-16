const Discord = require("discord.js"); 

module.exports.run = async (client, message, args, color, prefix, lang) => { 

let E = new Discord.RichEmbed() 
.setTitle("Invite ??")
.setDescription(lang.invite_bot)
.setColor(color)
.addField("Invite Link", `[${lang.click_here}](https://discordapp.com/oauth2/authorize?client_id=709305478882000918&scope=bot&permissions=2146827519)`, true) 

return message.channel.send(E)

  } 

  exports.conf = {
    aliases: [],
    cooldown: "0"
  }
exports.help = {
    name: 'invite',
    description: 'To Invite This Bot',
usage: "invite",
  example: 'invite'
}
