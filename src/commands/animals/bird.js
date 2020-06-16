const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const { body } = await client.snek.get('http://random.birb.pw/tweet/');
			const link = `https://random.birb.pw/img/${body}`;

			const birb = new Discord.RichEmbed()
			.setColor(color)
			.setTitle('🕊 ' + lang.image_error)
			.setURL(link)
			.setImage(link)
			return message.channel.send(birb)
			
	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['burung'],
	cooldown: '10'
}

exports.help = {
	name: 'birb',
	description: 'Show random image Bird',
	usage: 'birb'
}