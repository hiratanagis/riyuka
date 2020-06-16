const Discord = require("discord.js")
const ytdl = require('ytdl-core')
const oppuscript = require('opusscript')

exports.run = async (client, message, args, color, prefix, lang) => {
  const serverQueue = client.queue.get(message.guild.id)
  const voiceChannel = message.member.voiceChannel.name;
  let voi = lang.music_voicechannelnojoin;
	if(!message.member.voiceChannel) return message.channel.send(lang.music_voicechannelojoin);
  if(serverQueue) return message.channel.send(lang.stream_playfail.replace('%stop', `\`${prefix}stop\``))
  var text = lang.stream_noinput.replace('%stationlist', `\`${prefix}stationlist\``);
  if (!args[0]) return message.channel.send(text)
  
  if (args[0] != 'anime'
      && args[0] != 'ncs' 
      && args[0] != 'nightcore'
      && args[0] != 'jpop'
      && args[0] != 'kpop'
      && args[0] != 'gaming'
      && args[0] != 'noisefm'
      && args[0] != 'chillhop'
      && args[0] != 'college-music' && args[0] != 'college'
      && args[0] != 'mellowbeat'
      && args[0] != 'shiloh' && args[0] != 'shiloh-dynasty' && args[0] != 'shilohdynasty'
      && args[0] != 'nourish'
      && args[0] != 'inyourchill' && args[0] != 'in-your-chill') {
    var invalid = `Invalid station, type \`${prefix}stationlist\` for more information`
    return message.channel.send(lang.stream_invalidstation.replace('%stationlist', `\`${prefix}stationlist\``))
  }
  
    const permissions = message.member.voiceChannel.permissionsFor(client.user);
		if (!permissions.has('CONNECT')) return message.channel.send(lang.stream_nopermission);
		if (!permissions.has('SPEAK')) return message.channel.send(lang.stream_nopermission);
    
  
    if (args[0] == 'ncs') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'NCS Music',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[NCS Music](https://www.youtube.com/watch?v=oZzQC8NVTeM)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/oZzQC8NVTeM/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=oZzQC8NVTeM');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }

    if (args[0] == 'anime') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Anime Music',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[Anime Music](https://www.youtube.com/watch?v=PRlAY486hVg)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/PRlAY486hVg/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=PRlAY486hVg');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }

    if (args[0] == 'nightcore') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Nightcore Music',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[Nightcore Music](https://www.youtube.com/watch?v=PYy1dT8D--Q)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/PYy1dT8D--Q/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=PYy1dT8D--Q');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
  
    if (args[0] == 'gaming') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Gaming Music Radio',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[Gaming Music Radio](https://www.youtube.com/watch?v=GVC5adzPpiE)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/GVC5adzPpiE/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=GVC5adzPpiE');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
    

//Radio
    if (args[0] == "jpop") {
      var stream = `http://listen.moe/opus`;
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'J-POP',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[J-POP](http://listen.moe/opus)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/533806235321892864/548308314849673246/share.jpg`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const dispatcher = connection.playArbitraryInput(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
  
    if (args[0] == "kpop") {
      var stream = `http://listen.moe/kpop/opus`;
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'K-POP',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[K-POP](http://listen.moe/kpop/opus)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/533806235321892864/548312584898609163/get.png`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const dispatcher = connection.playArbitraryInput(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
    if (args[0] == "noisefm") {
      var stream = `https://play.sas-media.ru/play`;
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Noise FM',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming', `[Noise FM](https://play.sas-media.ru/play)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://cdn.discordapp.com/attachments/533806235321892864/548313087506251816/poster.jpg`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy the radio :)")
            message.channel.send(embed);
            const dispatcher = connection.playArbitraryInput(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
  
  //lo-fi
  if (args[0] == 'chillhop') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi chillhop',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[chillhop](https://www.youtube.com/watch?v=bebuiaSKtU4)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/bebuiaSKtU4/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=bebuiaSKtU4');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
  if (args[0] == 'college-music' || args[0] == 'college') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi college music',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[college music](https://youtu.be/F0IbjVq-fgs)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/F0IbjVq-fgs/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://youtu.be/F0IbjVq-fgs');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
  if (args[0] == 'mellowbeat') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi mellowbeat',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[mellowbeat](https://www.youtube.com/watch?v=qK9OLRbAW30)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/qK9OLRbAW30/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://www.youtube.com/watch?v=qK9OLRbAW30');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
   if (args[0] == 'shiloh' || args[0] == 'shiloh-dynasty' || args[0] == 'shilohdynasty') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi shiloh dynasty',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[shiloh dynasty](https://youtu.be/2atQnvunGCo)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/2atQnvunGCo/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://youtu.be/2atQnvunGCo');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
   if (args[0] == 'nourish') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi nourish',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[nourish](https://youtu.be/IjMESxJdWkg)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/IjMESxJdWkg/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://youtu.be/IjMESxJdWkg');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
   if (args[0] == 'inyourchill' || args[0] == 'in-your-chill') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => {
            const streaming = {
              textChannel: message.channel,
			        voiceChannel: voiceChannel,
			        connection: null,
			        volume: 100,
              stream: 'Lo-Fi in your chill',
              request: message.author
            }
            client.stream.set(message.guild.id, streaming)
            try {
              streaming.connection = connection;
            } catch(e) {
              client.stream.delete(message.guild.id)
              return message.channel.send(`Oh no, kesalahan terjadi :( \`${e.message}\``);
            }
          
            const embed = new Discord.RichEmbed()
            .addField('Now Streaming Lo-Fi', `[in your chill](https://youtu.be/B8tQ8RUbTW8)`)
            .addField('Request', `${message.author}`)
            .setThumbnail(`https://i.ytimg.com/vi/B8tQ8RUbTW8/maxresdefault.jpg?width=1280&height=720`)
            .setColor("RANDOM")
            .setFooter("I hope you enjoy this Lo-Fi :)")
            message.channel.send(embed);
            const stream = ytdl('https://youtu.be/B8tQ8RUbTW8');
            const dispatcher = connection.playStream(stream);
         
            dispatcher.on('error', e => message.channel.send(`${e}`));
            dispatcher.setVolume(1);
            dispatcher.setBitrate(64)
          })
        .catch(console.log);
      } else {
        message.channel.send(voi);
      }
    }
}
exports.conf = {
    aliases: [],
    cooldown: ""
}

exports.help = {
    name: "startstream",
  description: "Start Streaming on your server",
    usage: "startstream <stationlist>",
  example: 'startstream [station]'
}