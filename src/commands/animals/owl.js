const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('http://pics.floofybot.moe/owl');
			const link = body.image;

			const owl = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(owl)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['burung-hantu'],
	cooldown: '10'
}

exports.help = {
	name: 'owl',
	description: 'Show random image Owl',
	usage: 'owl'
}