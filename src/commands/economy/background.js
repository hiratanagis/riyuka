const Discord = require('discord.js');
const fs = require('fs');
let bg = require('../../database/background.json');
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {

  if(!bg[message.author.id]){
    bg[message.author.id] = {
      background: 'https://cdn.discordapp.com/attachments/517214088896446466/529803566412595237/20190102_072921.jpg'
    };
  }
  
  var bal = await db.fetch(`userBalance_${message.author.id}`)
  
  let amount = 2000;
  
  if (bal < amount) return message.channel.send(lang.no_balance) 
  
  let newBg = message.attachments.first();
  if(!newBg) return message.channel.send(lang.background_noinput)
  
  bg[message.author.id].background = newBg.url;
  
  let h = await message.channel.send(lang.please_wait);
  
  db.subtract(`userBalance_${message.author.id}`, amount)
  
  fs.writeFile('./src/database/background.json', JSON.stringify(bg, null, 2), (err) => {
  
    let bgEmbed = lang.background_set
    message.channel.send(bgEmbed)
  });
  

}

exports.conf = {
    aliases: ['bg'],
    cooldown: "10"
}

exports.help = {
    name: "background",
    description: "Set new background",
    usage: "background [attachments]"
}
