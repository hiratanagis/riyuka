const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://animals.anidiots.guide/penguin');
			const link = body.link;

			const penguin = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(penguin)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['pinguin'],
	cooldown: '10'
}

exports.help = {
	name: 'penguin',
	description: 'Show random image Penguin',
	usage: 'penguin'
}