exports.run = async (client, msg, args, color, prefix, lang) => {
	const serverQueue = client.queue.get(msg.guild.id);
  const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
	if (!msg.member.voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);
  if(!serverQueue) return msg.channel.send(lang.music_noplay);
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(lang.music_voicechannelvolume.replace('%voicechannel', `\`${serverQueue.voiceChannel.name}\``));

	try{
		if(!args.length) return msg.channel.send(lang.music_currentvolume.replace('%volume', `\`${serverQueue.volume}%\``));
		args[0].replace('/\%/g', '')
		if(isNaN(args[0])) return msg.channel.send(lang.music_volumenoinput);
		if(args[0] > 100) return msg.channel.send(lang.music_volumeinvalid);
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolume(args[0] / 100);
		return msg.channel.send(`🔊 ${lang.music_volumeset} : \`${args[0]}\``);
	}catch(e){
		return msg.channel.send(lang.error);

	}
}


exports.conf = {
    aliases: ['vol', 'v'],
    cooldown: "5"
}

exports.help = {
    name: "volume",
    description: "Set volume",
    usage: "volume [1-100]",
  example: 'volome [0 - 100]'
}