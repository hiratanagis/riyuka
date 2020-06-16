const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://animals.anidiots.guide/lion');
			const link = body.link;

			const lion = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(':lion_face: ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(lion)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['singa'],
	cooldown: '10'
}

exports.help = {
	name: 'lion',
	description: 'Show random image Lion',
	usage: 'lion'
}