const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
  try {
      const { body } = await client.snek.get('https://animals.anidiots.guide/tiger');
      const link = body[0];

      const tiger = new Discord.RichEmbed()
      .setColor(color)
      .setTitle(lang.image_error)
      .setURL(link)
      .setImage(link)
      return message.channel.send(tiger)

  } catch(e) {
    return message.channel.send(lang.error)
  }
}

exports.conf = {
  aliases: ['harimau'],
  cooldown: '10'
}

exports.help = {
  name: 'tiger',
  description: 'Show random image Tiger',
  usage: 'tiger'
}
