const { RichEmbed } = require('discord.js');
const randomMeow = require('random-meow');

exports.run = async (client, message, args, color, prefix, lang) => {
	try {
			const url = await randomMeow()

			const cat = new RichEmbed()
			.setColor(color)
			.setTitle('🐈 ' + lang.image_error)
			.setURL(url)
			.setImage(url)
			return message.channel.send(cat)

	} catch(e) {
		return message.channel.send(lang.error)
	}
}

exports.conf = {
	aliases: ['kucing'],
	cooldown: '10'
}

exports.help = {
	name: 'cat',
	description: 'Show random image Cat',
	usage: 'cat'
}


/*
function showCat (client, message, args, color, prefix, lang){
	try{
		return exports.getCat(message.channel);
	} catch (err) {
		return message.channel.send(err.stack, { code: 'ini' });
	}
}

exports.getCat = async (channel, extend = '') => {
	const url = await randomMeow()
	const ctx = new RichEmbed();
	ctx.setTitle('🐈 ' + lang.image_error);
	ctx.setURL(url);
	ctx.setImage(url);
	return channel.send(extend, {embed: ctx});
}

this.conf = {
	aliases: ['🐈', 'kucing'],
	cooldown: '10'
}

this.help = {
	name: 'cat',
	description: 'Menampilkan gambar 😸 Kucing secara acak',
	usage: 'cat'
}

this.run = showCat;
*/