const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
  if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== '418383699361529856') return message.channel.send(lang.user_nopermission);
  if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS") && message.author.id !== '418383699361529856') return message.channel.send(lang.bot_nopermission)
  
  let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toBan) return message.channel.sendMessage(lang.mention_noinput);
  let reason = args.join(" ").slice(22);
//  if (toBan.hasPermission("BAN_MEMBERS")) return message.channel.send("This User Cannot Be Banned :(").then(msg => msg.delete(5000));
  
  if (toBan.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toBan).ban(reason);
   try {
    if (!reason) {
      toBan.send(`**${toBan.user.tag}** ${lang.banned_succes} **${message.guild.name}**`)
    } else {
      toBan.send(`**${toBan.user.tag}** ${lang.banned_succes} **${message.guild.name}**
${lang.reason}: "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor(color)
    .setTitle(lang.user_banned)
    .addField('username', toBan.user.username, true)
    .addField('ID', toBan.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
 message.channel.send (lang.bot_cannotban.replace('%user', `**${toBan.user.tag}**`))
  }
}
 
exports.conf = {
  aliases: ['banned'],
  cooldown: '5'
}

exports.help = {
  name: "ban",
  description: 'Ban somone from server',
  usage: 'ban [@mention someone] [Reason]'
}
