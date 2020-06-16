const Discord = require('discord.js');
const db = require('quick.db');
var ms = require('parse-ms');

exports.run = async (client, message, args, color, prefix, lang) => {
  if (!args.join(" ")) return message.reply(lang.reportbug_noinput)
  
  let cooldown = 8.64e+7
  
  let lastreport = await db.fetch(`lastReport_${message.author.id}`)
  if (lastreport !== null && cooldown - (Date.now() - lastreport) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastreport))
    message.reply(`${lang.reportbug_cooldown} ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds`)
  } else {
  db.set(`lastReport_${message.author.id}`, Date.now()); 
  let channel = client.channels.get("567476882359058443")
  
  let embed = new Discord.RichEmbed()
  .setColor(color)
  .setThumbnail(message.author.displayAvatarURL)
  .setAuthor(message.author.username + " Reporting Bug", message.author.displayAvatarURL)
  .setDescription(`Name: ${message.author} | ${message.author.tag}\nID: ${message.author.id}`)
  .addField("Reported Bug", args.join(" "))
  .setFooter("From Guild " + message.guild.name, message.guild.iconURL).setTimestamp()
  
  channel.send(embed)
  message.channel.send(lang.reportbug_succes)
  }
}
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "bugreport",
    description: "Reporting A Bug",
    usage: "bugreport <content>",
  example: 'bugreport [message]'
}