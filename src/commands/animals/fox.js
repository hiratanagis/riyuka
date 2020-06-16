const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://randomfox.ca/floof/');
			const link = body.image;

			const fox = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(':fox: ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(fox)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['rubah'],
	cooldown: '10'
}

exports.help = {
	name: 'fox',
	description: 'Show random image Fox',
	usage: 'fox'
}