const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://api.bunnies.io/v2/loop/random/?media=gif,png');
			const link = body.media.gif;

			const bunny = new Discord.RichEmbed()
			.setColor(color)
			.setTitle('🐇 ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(bunny)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['kelinci'],
	cooldown: '10'
}

exports.help = {
	name: 'bunny',
	description: 'Show random image Bunny',
	usage: 'bunny'
}