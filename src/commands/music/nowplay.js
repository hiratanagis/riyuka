const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args, color, prefix, lang) => {
	try{
		const serverQueue = client.queue.get(msg.guild.id);
    const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
		if(!serverQueue) return msg.channel.send(lang.music_noplay);
		const progBar = this.getProgressBar(serverQueue);
		const dur = this.getTime(serverQueue);
		const embed = new RichEmbed()
		.setColor(color)

  .setColor('RANDOM')
  .setAuthor(`Now Playing: ${serverQueue.songs[0].title}`, `https://images-ext-2.discordapp.net/external/Yp6FQzR5Y-U3z7qae5v6HOCCWkCkopthOw__m1QlyPU/%3Fv%3D1/https/cdn.discordapp.com/emojis/571969606609010690.gif`)
  .setThumbnail(serverQueue.songs[0].thumbnail)
  .addField('📎 Link', `[Click here](${serverQueue.songs[0].url})`, true)
//.addField('📤 Uploaded by', `**[${serverQueue.songs[0].uploadedby}](${serverQueue.songs[0].channelurl})**`, true)
//.addField('🎧 Voice Channel', `${serverQueue.songs[0].mamang}`, true)
  .addField('<:Verifikasi:571969782275112971> Requested by', `${serverQueue.songs[0].meminta}`, true)
    .setFooter(`Duration: ${serverQueue.songs[0].durationh}h ${serverQueue.songs[0].durationm}m ${serverQueue.songs[0].durations}s | Vol: ${serverQueue.volume}%`)
  .setDescription(`▶ ${progBar} \`${dur}\`🔊`)

		
		return msg.channel.send(embed);
	}catch(e){
		return msg.channel.send(lang.error);
	}
}

exports.getProgressBar = (serverQueue)=> {
  const duration = (serverQueue.songs[0].duration.minutes*60000) + ((serverQueue.songs[0].duration.seconds%60000)*1000);
	const percent = serverQueue.connection.dispatcher.time/duration;
	const num = Math.floor(percent*12);
	let str = '';
	for(let i = 0; i < 12; i++){
		str += i === num ? '🔘' : '▬';
  }
	return str;
}

exports.getTime = (serverQueue) => {
	const curentDurationMinute = Math.floor(serverQueue.connection.dispatcher.time/60000) < 10 ? `0${Math.floor(serverQueue.connection.dispatcher.time/60000)}` : Math.floor(serverQueue.connection.dispatcher.time/60000);
	const currentDurationSeconds = Math.floor((serverQueue.connection.dispatcher.time%60000)/1000) < 10 ? `0${Math.floor((serverQueue.connection.dispatcher.time%60000)/1000)}` : Math.floor((serverQueue.connection.dispatcher.time%60000)/1000);
	const endDurationMinute = serverQueue.songs[0].duration.minutes < 10 ? `0${serverQueue.songs[0].duration.minutes}` : serverQueue.songs[0].duration.minutes;
	const endDurationSeconds = serverQueue.songs[0].duration.seconds < 10 ? `0${serverQueue.songs[0].duration.seconds}` : serverQueue.songs[0].duration.seconds;
	return `[${curentDurationMinute}:${currentDurationSeconds} - ${endDurationMinute}:${endDurationSeconds}]`;
}

exports.conf = {
    aliases: ['np', 'nowplaying'],
    cooldown: '3'
};

exports.help = {
    name: 'nowplay',
    description: 'What is nowplay?',
    usage: 'nowplay',
  example:'nowplay'
};