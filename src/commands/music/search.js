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
		const videos = await youtube.searchVideos(args.join(' '), 10);
		if(!videos.length) return msg.channel.send(lang.music_notfound);
		const embed = new RichEmbed()
		.setColor(color)
    .setAuthor(msg.author.username, msg.author.displayAvatarURL)
		.setDescription(videos.map((x,i) => `\`${i+1}.\` ${x.title}`).join('\n\n'))
		.setFooter('ℹ️ To select song please provide value 1-10');
		const thisMess = await msg.channel.send(embed);
		const filter = msgs =>  (!isNaN(msgs.content) || msgs.content === 'cancel') && msgs.author.id === msg.author.id;
    
		const responses = await msg.channel.awaitMessages(filter, { max: 1, time: 30000});
    
		if(!responses.size) return thisMess.delete();
    if(responses.first().content === 'cancel') return msg.channel.send(lang.music_canceled).then(function (message) {
    thisMess.delete();
    })
		const choice = parseInt(responses.first().content, 10);
		const arg = [`https://www.youtube.com/watch?v=${videos[choice-1].id}`];
		await thisMess.delete();
		return client.commands.get('pluginplay').run(client, msg, arg);
	} catch (err) {
		return msg.channel.send(lang.error);
	}
}

this.conf = {
	aliases: ['sc'],
	cooldown: '10'
}

this.help = {
	name: 'search',
	description: 'Search music and play it',
	usage: 'search <query>',
  example: 'search [Song Name]'
}

this.run = playSearch;