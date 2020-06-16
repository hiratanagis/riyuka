const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://animals.anidiots.guide/panda');
			const link = body.link;

			const panda = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(panda)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: [],
	cooldown: '10'
}

exports.help = {
	name: 'panda',
	description: 'Show random image Panda',
	usage: 'panda'
}