const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://random-d.uk/api/v1/random?type=gif');
			const link = body.url;

			const duck = new Discord.RichEmbed()
			.setColor(color)
			.setTitle('🦆 ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(duck)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['bebek'],
	cooldown: '10'
}

exports.help = {
	name: 'duck',
	description: 'Show random image Duck',
	usage: 'duck'
}