const { owners_id } = require("../../config.json");
const Discord = require("discord.js");
const { post } = require('node-superfetch');

const choice = ['🚫'] 
exports.run = async (client, message, args, color) => {

  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;

    const embed = new Discord.RichEmbed()
    .setColor(color)
    .addField('Input', '```js\n' + args.join(" ") + '```')

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'TOKEN!!! O-oh thats my token';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1023) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.addField('Output', `https://www.hastebin.com/${body.key}.js`)
          embed.setFooter(`React to delete message.`);
      } else {
          embed.addField('Output', '```js\n' + output + '```')
          embed.setFooter(`React to delete message.`);
      }
      const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        })
    } catch (e) {
      let error = clean(e);
      if (error.length > 1023) {
          const { body } = await post('https://www.hastebin.com/documents').send(error);
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`)
          embed.setFooter(`React to delete message.`);
      } else {
          embed.addField('Error', '```js\n' + error + '```')
          embed.setFooter(`React to delete message.`);
      }
      const m = await message.channel.send(embed);
      for(const chot of choice){
					await m.react(chot);
				}
      const filter = (rect, usr) => choice.includes(rect.emoji.name) && usr.id === message.author.id;
				m.createReactionCollector(filter, { time: 60000, max: 1})
				.on('collect', async col =>{
					if(col.emoji.name === '🚫') return m.delete();
        });
    } 
});
  
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
/*
const { owners_id } = require("../../config.json");
const { RichEmbed } = require("discord.js");
const { post } = require('node-superfetch');
const db = require('quick.db')

exports.run = async (client, message, args, color) => {
  var bot = client;

  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .addField('Masuk', '```js\n' + args.join(" ") + '```')

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'Mau tau aja lu';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(output);
          embed.addField('Keluar', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Keluar', '```js\n' + output + '```');
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await post('https://www.hastebin.com/documents').send(error);
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
  });
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}*/

exports.conf = {
  aliases: ["ev", "e"],
  cooldowns: '0'
} //k

exports.help = {
  name: "eval",
  description: "evaluated",
  usage: "eval [some super javascript code]"
}