exports.run = async (client, msg, args, color, prefix, lang) => {
	const serverQueue = client.queue.get(msg.guild.id);
  const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
	if (!msg.member.voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);
  if(!serverQueue) return msg.channel.send(lang.music_noplay);
	if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(lang.music_voicechannelfail.replace('%voicechannel', `\`${serverQueue.voiceChannel.name}\``));
	
	try{
		serverQueue.loop = !serverQueue.loop;
		if(serverQueue.loop) return msg.channel.send(lang.music_loopon);
		return msg.channel.send(lang.music_loopoff);
	}catch(e){
		return msg.channel.send(lang.error);
	}
}

exports.conf = {
  aliases: ['repeat', 'r'],
  cooldown: '3'
}

exports.help = {
  name: 'loop',
  description: 'Loop the queue',
  usage: 'loop',
  example: 'loop'
}