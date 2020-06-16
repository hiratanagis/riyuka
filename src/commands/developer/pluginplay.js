const { RichEmbed, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { GOOGLE_KEY } = process.env;
const youtube = new YouTube(GOOGLE_KEY);
const choice = ['1⃣', '2⃣', '3⃣', '❌'];
const db = require('quick.db');

exports.youtube = youtube;
exports.run = async (client, msg, args, color, prefix, lang) => {
	try{
		if(args.length < 1) return msg.channel.send(lang.music_titlenoinput);
		const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
		const voiceChannel = msg.member.voiceChannel;
    const streaming = client.stream.get(msg.guild.id)
		if(!voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);

    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
		if(client.queue.has(msg.guild.id) && voiceChannel.id !== client.queue.get(msg.guild.id).voiceChannel.id) return msg.channel.send(lang.music_voicechannelplay.replace('%voicechannel', `\`${client.queue.get(msg.guild.id).voiceChannel.name}\``));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) return msg.channel.send(lang.music_playnopermission);
		if (!permissions.has('SPEAK')) return msg.channel.send(lang.music_playnopermission);
		if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await this.handleVideo(client, video2, msg, voiceChannel, true);
			}
			return msg.channel.send(lang.music_playlist.replace('%playlist', `\`${playlist.title}\``));
		}
		try{
			const video = await youtube.getVideo(url);
			return this.handleVideo(client, video, msg, voiceChannel);
		}catch(e){
			try{
				const videos = await youtube.searchVideos(args.join(' '), 3);
				let m = await msg.channel.send(`<a:Loading:572827174776733708> ${lang.please_wait}`);
				for(const chot of choice){
					await m.react(chot);
				}
				m = await embed(m, videos, 'search');
				const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === msg.author.id;
				m.createReactionCollector(filter, { time: 30000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '❌') {
          //m.delete()
          msg.channel.send(lang.music_canceled)
          }//return m.delete();
          try {
					const oneUrl = await youtube.getVideoByID(videos[choice.indexOf(col.emoji.name)].id);
					return this.handleVideo(client, oneUrl, msg, voiceChannel);
          } catch (e) {
            console.log(lang.music_canceled)
          }
				})
				.on('end', c => m.delete());
			}catch(err){
				return msg.channel.send(lang.music_notfound);
      }
		}
	}catch(e){
		return msg.channel.send(lang.error);
	}
}

exports.handleVideo = async (client, video, msg, voiceChannel, playlist = false, force = false) => {
	const serverQueue = client.queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		thumbnail: video.thumbnails.high.url,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		votes: [],
    uploadedby: video.channel.title, 
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    durationh: video.duration.hours,
		durationm: video.duration.minutes,
		durations: video.duration.seconds,
    duration: video.duration,   mamang: msg.member.voiceChannel.name, 
    meminta: msg.author,
		loop: false
	}
	if(!serverQueue){
  let language = db.get(`lang.${msg.guild.id}`);
  if (language == null) language = 'en-US';
	let lang = require(`../../languages/${language}.json`);
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true
		}
		client.queue.set(msg.guild.id, queueConstruct);
		queueConstruct.songs.push(song);
		try{
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(client, msg.guild, queueConstruct.songs[0]);
		}catch(e){
			client.queue.delete(msg.guild.id);
			return msg.channel.send(lang.error);
		}
	} else {
		force ? serverQueue.songs.splice(1, 0, song) : serverQueue.songs.push(song);
		if(!playlist) return embed(msg, song, 'addQueue');
	}
}

async function play(client, guild, song, type = 'biasa'){
	const serverQueue = client.queue.get(guild.id);
  let language = db.get(`lang.${guild.id}`);
  if (language == null) language = 'en-US';
	let lang = require(`../../languages/${language}.json`);
 	if (!song) {
    serverQueue.textChannel.send(lang.music_finished)
		serverQueue.voiceChannel.leave();
		return client.queue.delete(guild.id);
	}
//  const stream = await ytdlDiscord(song.url);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { quality: 'highestaudio' }))
 // const dispatcher = serverQueue.connection.playOpusStream(stream, { highWaterMark: 1024 * 1024 * 10})
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.'); 
			else console.log("test" +reason);
      		const shiffed = serverQueue.songs.shift();
		if(serverQueue.loop) serverQueue.songs.push(shiffed);
		return play(client, guild, serverQueue.songs[0]);
		})
			/*serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})*/
		.on('error', error => console.error(error));
// dispatcher.setVolume(serverQueue.volume / 100);
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
/*	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, { filter: 'audioonly'}))
	.on('end', res => {
		if(res !== 'Stream is not generating quickly enough.');
     else console.error(res);
		if(res.includes('seek')){
			const seekTo = parseInt(res.split(' ')[1], 10);
			serverQueue.songs.shift();
			play(client, guild, serverQueue.songs[0], 'seek', seekTo);
		}else{
		 const shiffed = serverQueue.songs.shift();
			if(serverQueue.loop) serverQueue.songs.push(shiffed);
		 play(client, guild, serverQueue.songs[0]);
    }
	})
	.on('error', err => console.error(err));
	dispatcher.setVolume(serverQueue.volume / 100);
	type !== 'seek' ? embed(serverQueue.textChannel, song) : undefined; */
  
    
  var embed2 = new RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setAuthor(`Playing: ` + song.title, `https://cdn.discordapp.com/emojis/571969606609010690.gif?v=1`)
  .addField('📎 Link', `[Click here](${song.url})`, true)
  .addField('<:Verifikasi:571969782275112971> Requested by', `${song.meminta}`,true)
  .setFooter(`Duration: ${song.durationh}h ${song.durationm}m ${song.durations}s | Vol: ${serverQueue.volume}%`)

	serverQueue.textChannel.send(embed2);
}

function embed(msg, song, type = 'biasa'){
  let language = db.get(`lang.${msg.guild.id}`);
  if (language == null) language = 'en-US';
	let lang = require(`../../languages/${language}.json`);
	if(type === 'addQueue'){
		return msg.channel.send(`<:Ceklist:571969753204129802> ${lang.music_addedqueue} \`${song.title}\` Request by ${song.meminta}`);
	}
	if(type === 'search'){
		const embed = new RichEmbed()
		.setColor('RANDOM')
		.setDescription(song.map((x, i) => `${choice[i]} » ${x.title}`))
    .setFooter(lang.song_listclosed)
		return msg.edit('<a:Musik:571969606609010690> **| Songs selection**',{embed: embed});
	}
  


}

exports.conf = {
	aliases: [],
	cooldown: "3"
}

exports.help = {
	name: 'pluginplay',
	description: 'Plugin Play music',
	usage: 'play [Song name | link | playlist]'
}