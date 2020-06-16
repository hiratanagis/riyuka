const { RichEmbed } = require('discord.js');

exports.run = async(client, message, args, color, prefix, lang) => {
  
  try {
var x = await client.shard.broadcastEval('`Shard: [${this.shard.id+1} / ${this.shard.count}]\nGuild: ${this.guilds.size}\nUser: ${this.users.size}\nChannel: ${this.channels.size}\nPing: ${this.ping.toFixed(2)}ms`')

  let embed = new RichEmbed() 
  .setColor(color)
  .setThumbnail(client.user.displayAvatarURL) 
  .setTitle('Shards Information') 
  .setDescription(`${lang.shard_guild} ${client.shard.id+1} ${lang.of} ${client.shard.count}\n\n${x.join('\n\n')}`)
  .setFooter(`Request By: ${message.author.tag} | ${client.user.username}`)
  return message.channel.send(embed)
  } catch (err) {
    message.channel.send(lang.error);
  } 
}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "shard",
    description: "Check all shard",
    usage: "shard",
  example: 'shard'
}