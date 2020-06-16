const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('http://shibe.online/api/shibes');
			const link = body[0];

			const shiba = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(shiba)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['shiba'],
	cooldown: '10'
}

exports.help = {
	name: 'shiba',
	description: 'Show random image Shiba',
	usage: 'shiba'
}