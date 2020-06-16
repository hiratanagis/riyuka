const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async(client, message, args, color, prefix, lang) => {
  
  if (!args[0]) {
  let embed = new Discord.RichEmbed()
  .setColor(color)
  .setDescription(lang.remind)
  .addField(lang.usage, `${prefix}aichat set [#channel]
${prefix}aichat language [language]
${prefix}aichat disable

**${lang.available_lang}**
eng [English]
ind [Indonesian] BETA`)
        .setFooter(`AI Chat`, client.user.displayAvatarURL)
        .setTimestamp()
         return message.channel.send(embed); 
};
  if (args[0] != 'set'
      && args[0] != 'lang'
      && args[0] != 'language'
      && args[0] != 'disable') {
let embed1 = new Discord.RichEmbed()
    .setColor(color)
    .setDescription(lang.remind)
    .addField(lang.usage, `${prefix}aichat set [#channel]
${prefix}aichat language [language]
${prefix}aichat disable

**${lang.available_lang}**
eng [English]
ind [Indonesian] BETA`)
        .setFooter(`AI Chat`, client.user.displayAvatarURL)
        .setTimestamp()
    return message.channel.send(embed1)
  
    
  }  if (args[0] == 'set') {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
    var channel = message.mentions.channels.first()
    if(!channel) return message.reply(lang.mentionchannel_noinput)
    db.set(`ai.${message.guild.id}`, channel.id)
    message.channel.send(`${lang.aichat_channelset} <#${channel.id}>`)
  } if (args[0] == 'disable') {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
    db.delete(`ai.${message.guild.id}`)
    message.channel.send(lang.aichat_disable)
  } if (args[0] == 'lang' || args[0] == 'language') {
    if (args[1] != 'eng'
    && args[1] != 'english'
    && args[1] != 'ind'
    && args[1] != 'indonesian') {
    let embed2 = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`**${lang.aichat_languagenoinput}**
• eng [english]
• ind [indonesian] BETA`)
    return message.channel.send(embed2)
    }
    if (args[1] == 'eng' || args[1] == 'english') {
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
      db.set(`ailang.${message.guild.id}`, 'english')
      message.channel.send(`${lang.aichat_languagechange} English`)
    } if (args[1] == 'ind' || args[1] == 'indonesian') {
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
      db.set(`ailang.${message.guild.id}`, 'indonesia')
      message.channel.send(`${lang.aichat_languagechange} Indonesian`)
    }
  }
    
}
exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: 'aichat',
    description: 'Set channel Ai Chat',
    usage: `aichat set <#channel>
aichat language [language]
aichat disable

**Availables language:**
eng [English]
ind [Indonesian] BETA`
}