const { embed_color } = require('../config.json');
const config = require('../config.json');
const { Collection, RichEmbed } = require('discord.js');
const cooldowns = new Collection();
const fs = require('fs');
const db = require('quick.db');

module.exports = async (client, message) => {
  let channelss = client.channels.get("575054765684424704")
  
  let language = db.get(`lang.${message.guild.id}`);
  if (language == null) language = 'en-US';
	let lang = require(`../languages/${language}.json`);

  let prefixes = JSON.parse(fs.readFileSync("./src/database/prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.bot_prefix
    };
}
    let prefix = prefixes[message.guild.id].prefixes;
    let color = embed_color;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    args.missing = argsMissing;
    
   let blacklist = JSON.parse(fs.readFileSync("./src/database/blacklist.json", "utf8"));
  if (!blacklist[message.author.id]) {
    blacklist[message.author.id] = {
     values: 0
      };  
    }
  let values = blacklist[message.author.id].checker
    if (values === 1) {
      message.author.send(`📓 | Sorry, you have **BLACKLISTED** from using ${client.user.username}.`);
    } else {

    // cooldowns command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
        cooldowns.set(commandFile.help.name, new Collection());
    }
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;

    if (!timestamps.has(member.id)) {
        timestamps.set(member.id, now);
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`⏱ | **${member.user.username}**, You'll be able to use this command again in **${timeLeft.toFixed(1)}** seconds.`).then(msg=>msg.delete(7000));
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }
  
    // command handler
  try {
  let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  commands.run(client, message, args, color, prefix, lang);
  if (!commands) return;
  } catch (e) {
      console.error(e)
  } finally {
    try {
  console.info(`${message.author.tag}[${message.author.id}] menggunakan command ${message.content.split(" ")[0].replace(prefix, '')} di channel ${message.channel.name}, shard ﹙${client.shard.id}﹚ ${message.guild.name}[${message.guild.id}]`);

  } catch(e) {
    console.info(e)
  }
  }
} 

function argsMissing(message, res, help){
  const embed = new RichEmbed()
  .setThumbnail('https://twemoji.maxcdn.com/2/72x72/2753.png') 
	.setColor('#FF1000')
	.setTitle('⛔ | It\'s not how you use '+ help.name)
	.addField('❓ |  Reason', `\`\`\`${res}\`\`\``)
	.addField('📚 | Usage', `\`\`\`${help.usage}\`\`\``)
//	.addField('Example', help.example.map(x => `\`\`\`${x}\`\`\``));
	return message.channel.send(embed);
}
  
function emoji (id) {
  return client.emojis.get(id).toString();
}
}
