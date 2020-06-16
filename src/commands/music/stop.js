exports.run = async (client, msg, args, color, prefix, lang) => {
	const serverQueue = client.queue.get(msg.guild.id);
  const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
	if (!msg.member.voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);
  if(!serverQueue) return msg.channel.send(lang.music_noplay);
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(lang.music_voicechannelstop.replace('%voicechannel', `\`${serverQueue.voiceChannel.name}\``));
	msg.channel.send(lang.music_stop);
	serverQueue.songs = [];
	return serverQueue.connection.dispatcher.end(); 
	try{
	}catch(e){
		return msg.channel.send(lang.error);
	}
}

exports.conf = {
	aliases: ['s','l', 'dc', 'leave'],
	cooldown: 1
}

exports.help = {
	name: 'stop',
	description: 'Stop the music',
	usage: 'stop',
  example: 'stop'
}