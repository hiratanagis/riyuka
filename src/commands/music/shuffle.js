const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color, prefix, lang) => {
	try{
		const serverQueue = client.queue.get(msg.guild.id);
    const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
		if(!serverQueue) return msg.channel.send(lang.music_noplay);
    if(serverQueue.songs.length < 3) return msg.channel.send(lang.music_addsomemusic);
		if(!msg.member.voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);
		if(msg.member.voiceChannel.id !== serverQueue.voiceChannel.id) return msg.channel.send(lang.music_voicechannelshuffle.replace('%voicechannel', `\`${serverQueue.voiceChannel.name}\``));
		const np = serverQueue.songs.shift();
		const shuffled = client.util.shuffle(serverQueue.songs);
		shuffled.unshift(np);
		serverQueue.songs = shuffled;
		return msg.channel.send(lang.music_shuffle);
	}catch(e){
		return msg.channel.send(lang.error);
	}
}

exports.conf = {
	aliases: ['sf'],
	cooldown: 3
}

exports.help = {
  name: 'shuffle',
  description: 'Shuffle the queue',
  usage: 'shuffle',
  example: 'shuffle'
}