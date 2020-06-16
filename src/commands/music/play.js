const { RichEmbed } = require('discord.js');
const { GOOGLE_KEY } = process.env;
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_KEY);

async function playSearch (client, msg, args, color, prefix, lang){
	if(!args.length) return msg.channel.send(lang.music_titlenoinput);
  const voiceChannel = msg.member.voiceChannel;
  const streaming = client.stream.get(msg.guild.id)
	if(!voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);

    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
	if(client.queue.has(msg.guild.id) && voiceChannel.id !== client.queue.get(msg.guild.id).voiceChannel.id) return msg.channel.send(lang.music_voicechannelplay.replace('%voicechannel', `\`${client.queue.get(msg.guild.id).voiceChannel.name}\``));
	const permissions = voiceChannel.permissionsFor(msg.client.user);
	if (!permissions.has('CONNECT')) return msg.channel.send(lang.music_playnopermission);
	if (!permissions.has('SPEAK')) return msg.channel.send(lang.music_playnopermission);
	try{
		const videos = await youtube.searchVideos(args.join(' '), 1);
//    let m = await msg.channel.send(`<:youtube:579906773222162442> **Searching** <:search1:579906656561922061> \`${args.join(' ')}\``);
		if(!videos.length) return msg.channel.send(lang.music_notfound);
		const arg = [`https://www.youtube.com/watch?v=${videos[0].id}`];
		return client.commands.get('pluginplay').run(client, msg, arg);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: ['p'],
	cooldown: '5'
}

this.help = {
	name: 'play',
	description: 'Play A Music',
	usage: 'play <song name>',
  example: 'play [Song Name / YT URL]'
}

this.run = playSearch;