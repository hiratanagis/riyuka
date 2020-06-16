const { RichEmbed } = require('discord.js');
const choice = ['🚫'] 
const db = require('quick.db')
const { owners_id, bot_prefix } = require('../../config.json')

exports.run = async (client, message, args, color, prefix, lang) => {
  let language = db.get(`lang.${message.guild.id}`);
  if (language == null) language = 'en-US';
  const Jwork = require(`../../../src/highlight/${language}.json`);
  const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
  let module = client.helps.array();
    if(!owners_id.includes(message.author.id)) module = client.helps.array().filter(x => !x.hide);
  
    const embed = new RichEmbed()
    .setColor(color)
    .setAuthor(client.user.username + ' ' + lang.category, client.user.displayAvatarURL)
    .setDescription(`_**Highlight**_\n\`${JworkR}\``)
    .setFooter(`© ${client.user.username} 2020 || Total: ${client.commands.size}`)
    
    
    for (const mod of module) {
      embed.addField(`${mod.name} (${mod.cmds.length})`, `\`${prefix}help ${mod.usage}\``, true);
    }
  if (!args[0]) {
     message.channel.send(embed)

    } else if (args[0] === 'administrator') {
        const m = await message.channel.send('Work in progress');
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
        
    } else if (args[0] === 'animals') { 
        const m = await message.channel.send('Work in progress');
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
        
    } else if (args[0] === 'core') {
    const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Core (13)', `https://cdn.discordapp.com/emojis/572835503381020682.gif?v=1`)
    .setTimestamp()
    .addField(`\`${prefix+client.commands.get('botinfo').help.example}\``, client.commands.get('botinfo').help.description)
    .addField(`\`${prefix+client.commands.get('bugreport').help.example}\``, client.commands.get('bugreport').help.description)
    .addField(`\`${prefix+client.commands.get('help').help.example}\``, client.commands.get('help').help.description)
    .addField(`\`${prefix+client.commands.get('invite').help.example}\``, client.commands.get('invite').help.description)
    .addField(`\`${prefix+client.commands.get('membercount').help.example}\``, client.commands.get('membercount').help.description)
    .addField(`\`${prefix+client.commands.get('ping').help.example}\``, client.commands.get('ping').help.description)
    .addField(`\`${prefix+client.commands.get('serveremoji').help.example}\``, client.commands.get('serveremoji').help.description)
    .addField(`\`${prefix+client.commands.get('servericon').help.example}\``, client.commands.get('servericon').help.description)
    .addField(`\`${prefix+client.commands.get('serverinfo').help.example}\``, client.commands.get('serverinfo').help.description)
    .addField(`\`${prefix+client.commands.get('serverroles').help.example}\``, client.commands.get('serverroles').help.description)
    .addField(`\`${prefix+client.commands.get('shard').help.example}\``, client.commands.get('shard').help.description)
    .addField(`\`${prefix+client.commands.get('stats').help.example}\``, client.commands.get('stats').help.description)
    .addField(`\`${prefix+client.commands.get('userinfo').help.example}\``, client.commands.get('userinfo').help.description)

    const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })

    } else if (args[0] === 'developer') {
        const m = await message.channel.send('Work in progress');
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
        
    } else if (args[0] === 'economy') { 
        const m = await message.channel.send('Work in progress');
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })

    } else if (args[0] === 'music') {
      const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Music (11)', `https://cdn.discordapp.com/emojis/572824837249171466.gif?v=1`)
    .setTimestamp()
    .addField(`\`${prefix+client.commands.get('loop').help.example}\``, client.commands.get('loop').help.description)
    .addField(`\`${prefix+client.commands.get('nowplay').help.example}\``, client.commands.get('nowplay').help.description)
    .addField(`\`${prefix+client.commands.get('pause').help.example}\``, client.commands.get('pause').help.description)
    .addField(`\`${prefix+client.commands.get('play').help.example}\``, client.commands.get('play').help.description)
    .addField(`\`${prefix+client.commands.get('queue').help.example}\``, client.commands.get('queue').help.description)
    .addField(`\`${prefix+client.commands.get('resume').help.example}\``, client.commands.get('resume').help.description)
    .addField(`\`${prefix+client.commands.get('search').help.example}\``, client.commands.get('search').help.description)
    .addField(`\`${prefix+client.commands.get('shuffle').help.example}\``, client.commands.get('shuffle').help.description)
    .addField(`\`${prefix+client.commands.get('skip').help.example}\``, client.commands.get('skip').help.description)
    .addField(`\`${prefix+client.commands.get('stop').help.example}\``, client.commands.get('stop').help.description)
    .addField(`\`${prefix+client.commands.get('volume').help.example}\``, client.commands.get('volume').help.description)
        const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
        
    } else if (args[0] === 'social') { 
        const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Social (6)', `https://cdn.discordapp.com/attachments/533806235321892864/721938749130276905/topeng.png`)
    .setTimestamp()
    .addField(`\`${prefix+client.commands.get('divorce').help.example}\``, client.commands.get('divorce').help.description)
    .addField(`\`${prefix+client.commands.get('level').help.example}\``, client.commands.get('level').help.description)
    .addField(`\`${prefix+client.commands.get('marry').help.example}\``, client.commands.get('marry').help.description)
    .addField(`\`${prefix+client.commands.get('profile').help.example}\``, client.commands.get('profile').help.description)
    .addField(`\`${prefix+client.commands.get('rep').help.example}\``, client.commands.get('rep').help.description)
    .addField(`\`${prefix+client.commands.get('setinfo').help.example}\``, client.commands.get('setinfo').help.description)
        const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })

    } else if (args[0] === 'soundboard') {
      let aa = 'boat';
    let bb = 'boi';
    let cc = 'bruh';
    let dd = 'chocolate';
    let ee = 'dance';
    let ff = 'fakeping';
    let gg = 'fart';
    let hh = 'fbi';
    let ii = 'gethelp';
    let jj = 'johnwick';
    let kk = 'macandcheese';
    let ll = 'oof';
    let mm = 'prunejuice';
    let nn = 'winxp';

    const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Soundboard (14)', `https://cdn.discordapp.com/emojis/575247409769349137.gif?v=1`)
    .setTimestamp()
    .addField(`\`${prefix}${aa}\``, client.commands.get(aa).help.description)
    .addField(`\`${prefix}${bb}\``, client.commands.get(bb).help.description)
    .addField(`\`${prefix}${cc}\``, client.commands.get(cc).help.description)
    .addField(`\`${prefix}${dd}\``, client.commands.get(dd).help.description)
    .addField(`\`${prefix}${ee}\``, client.commands.get(ee).help.description)
    .addField(`\`${prefix}${ff}\``, client.commands.get(ff).help.description)
    .addField(`\`${prefix}${gg}\``, client.commands.get(gg).help.description)
    .addField(`\`${prefix}${hh}\``, client.commands.get(hh).help.description)
    .addField(`\`${prefix}${ii}\``, client.commands.get(ii).help.description)
    .addField(`\`${prefix}${jj}\``, client.commands.get(jj).help.description)
    .addField(`\`${prefix}${kk}\``, client.commands.get(kk).help.description)
    .addField(`\`${prefix}${ll}\``, client.commands.get(ll).help.description)
    .addField(`\`${prefix}${mm}\``, client.commands.get(mm).help.description)
    .addField(`\`${prefix}${nn}\``, client.commands.get(nn).help.description)
        const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
        
    } else if (args[0] === 'stream') {
      const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Stream (4)', `https://cdn.discordapp.com/emojis/722063119974924388.png?v=1`)
    .setTimestamp()
    .addField(`\`${prefix+client.commands.get('nowstream').help.example}\``, client.commands.get('nowstream').help.description)
    .addField(`\`${prefix+client.commands.get('startstream').help.example}\``, client.commands.get('startstream').help.description)
    .addField(`\`${prefix+client.commands.get('stationlist').help.example}\``, client.commands.get('stationlist').help.description)
    .addField(`\`${prefix+client.commands.get('stopstream').help.example}\``, client.commands.get('stopstream').help.description)
        const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
    
  } else {
    let cmd = args[0];
    if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
      let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      let name = `${command.help.name}`;
      let desc = command.help.description;
      let aliases = command.conf.aliases;
      let cooldown = command.conf.cooldown;
      let usage = `${command.help.usage}`;

      let embed = new RichEmbed()
      .setThumbnail('https://twemoji.maxcdn.com/2/72x72/2753.png') 
      .setTitle(`Command: ${name}`) 
      .setDescription(lang.remind)
      .addField('Usage', `${usage}`)
      .addField('Aliases', aliases[0] ? `${aliases.join(`, `)}` : `No aliases`)
      .addField('Cooldown', cooldown || lang.nocooldown)
      .setColor(color)
      .setFooter(`Request by: ${message.author.tag}`) 
      return message.channel.send(embed);
    }
    if (!client.commands.has(cmd) || !client.commands.get(client.aliases.get(cmd))) {
      message.reply(lang.command_notfound + cmd);
    }
  }

}

exports.conf = {
    aliases: ['h'],
    cooldown: "5"
}

exports.help = {
    name: 'help',
    description: 'Show All Category',
    usage: `help [command]`,
  example: 'help [command]'
}