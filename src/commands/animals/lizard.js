const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://nekos.life/api/v2/img/lizard');
			const link = body.url;

			const lizard = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(':lizard: ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(lizard)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['kadal'],
	cooldown: '10'
}

exports.help = {
	name: 'lizard',
	description: 'Show random image Lizard',
	usage: 'lizard'
}