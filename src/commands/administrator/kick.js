const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== '418383699361529856') return message.channel.send(lang.user_nopermission);
  
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS") && message.author.id !== '418383699361529856') return message.channel.send(lang.bot_nopermission)
  
  let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toKick) return message.channel.sendMessage(lang.mention_noinput);
  let reason = args.join(" ").slice(22);
 // if (toKick.hasPermission("KICK_MEMBERS")) return message.channel.send("Hmm he Can't be kicked :(").then(msg => msg.delete(3000));
  
  if (toKick.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toKick).kick(reason);
   try {
    if (!reason) {
      toKick.send(`**${toKick.user.tag}** ${lang.kick_succes} **${message.guild.name}**`)
    } else {
      toKick.send(`**${toKick.user.tag}** ${lang.kick_succes} **${message.guild.name}**
${lang.reason}: "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor(color)
    .setTitle(lang.user_kick)
    .addField('username', toKick.user.username, true)
    .addField('ID', toKick.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
   message.channel.send(lang.bot_cannotkick.replace('%user', `**${toKick.user.tag}**`))
  }
}
 
exports.conf = {
  aliases: ['kick'],
  cooldown: '5'
}

exports.help = {
  name: "kick",
  description: 'Kick someone from server',
  usage: 'Kick [@mention someone] [Reason]'
}
