const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('https://random.dog/woof.json');
			const link = body.url;

			const dog = new Discord.RichEmbed()
			.setColor(color)
			.setTitle('🐕 ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(dog)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['anjing'],
	cooldown: '10'
}

exports.help = {
	name: 'dog',
	description: 'Show random image Dog',
	usage: 'dog'
}