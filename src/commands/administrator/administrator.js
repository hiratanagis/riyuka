const { RichEmbed } = require('discord.js');
const choice = ['🚫'] 

exports.run = async (client, message, args, color, prefix) => {

    let aa = 'addrole';
    let bb = 'aichat';
    let cc = 'ban';
    let dd = 'clear';
    let ee = 'embed';
    let ff = 'globalchat';
    let gg = 'goodbye';
    let hh = 'kick';
    
    let ii = 'logging';
    let jj = 'mute';
    let kk = 'prefix';
    let ll = 'removerole';
    let mm = 'say';
    let nn = 'unmute';
    let oo = 'warn';
    let pp = 'welcome';
    let qq = 'welcomeimg';

    const embed = new RichEmbed()
    .setColor(color)
    .setAuthor('Administrator (18)', `https://cdn.discordapp.com/emojis/572835503381020682.gif?v=1`)
    .setTimestamp()
    .addField(`\`${prefix}${aa}\``, client.commands.get(aa).help.description, true)
    .addField(`\`${prefix}${bb}\``, client.commands.get(bb).help.description, true)
    .addField(`\`${prefix}${cc}\``, client.commands.get(cc).help.description, true)
    .addField(`\`${prefix}${dd}\``, client.commands.get(dd).help.description, true)
    .addField(`\`${prefix}${ee}\``, client.commands.get(ee).help.description, true)
    .addField(`\`${prefix}${ff}\``, client.commands.get(ff).help.description, true)
    .addField(`\`${prefix}${gg}\``, client.commands.get(gg).help.description, true)
    .addField(`\`${prefix}${hh}\``, client.commands.get(hh).help.description, true)
    .addField(`\`${prefix}language\``, client.commands.get('language').help.description, true)
    .addField(`\`${prefix}${ii}\``, client.commands.get(ii).help.description, true)
    .addField(`\`${prefix}${jj}\``, client.commands.get(jj).help.description, true)
    .addField(`\`${prefix}${kk}\``, client.commands.get(kk).help.description, true)
    .addField(`\`${prefix}${ll}\``, client.commands.get(ll).help.description, true)
    .addField(`\`${prefix}${mm}\``, client.commands.get(mm).help.description, true)
    .addField(`\`${prefix}${nn}\``, client.commands.get(nn).help.description, true)
    .addField(`\`${prefix}${oo}\``, client.commands.get(oo).help.description, true)
    .addField(`\`${prefix}${pp}\``, client.commands.get(pp).help.description, true)
    .addField(`\`${prefix}${qq}\``, client.commands.get(qq).help.description, true)
    
    const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
}

exports.conf = {
    aliases: ['admin'],
    cooldown: "5"
}

exports.help = {
    name: 'administrator',
    description: 'Show All Administrator Command',
    usage: `administrator`
}