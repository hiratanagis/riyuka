const Discord = require("discord.js");
exports.run = async(bot, message, args, color, prefix, lang) => {
  let sicon = message.guild.iconURL;
 const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, sicon)
    .setColor(color)
    .setThumbnail(sicon)
    .setTitle('Member Count')
    .addField('🎭 | Member', `**${message.guild.memberCount}**`)
		.addField('👤 | User', `**${message.guild.members.filter(member => !member.user.bot).size}**`)
		.addField('💾 | Bot', `**${message.guild.members.filter(member => member.user.bot).size}**`)
 		.addField('📱 | Member Status', `**${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline/Invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`)
		.setFooter(`Owner: ${message.guild.owner.user.tag}`)
	message.channel.send(embed)
};

exports.conf = {
  aliases: [],
  cooldown: "10"
}

exports.help = {
  name: "membercount",
  description: "Show All Members and Bot",
  usage: "membercount",
  example: 'membercount'
}