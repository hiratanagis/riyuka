const Discord = require('discord.js');
const fs = require('fs');
let info = require('../../database/note.json');

exports.run = async (client, message, args, color, prefix, lang) => {
  
  if(!info[message.author.id]){
    info[message.author.id] = {
      note: 'This user has\nNot set info yet.'
    } 
  }
  let newInfo = args.join(' ');
  let len = 160;
  if(!newInfo) return message.channel.send(lang.setinfo_noinput)
  if(newInfo.length > len) return message.channel.send(`**${message.author.username}** ${lang.setinfo_length}`);
  let newsInfo = client.util.chunk(newInfo, 40).join('\n');
  info[message.author.id].note = newsInfo;
  let h = await message.channel.send(lang.please_wait);
  fs.writeFile('./src/database/note.json', JSON.stringify(info, null, 2), (err) => {
    
    let notesEmbed = new Discord.RichEmbed() 
      .setColor(color)
      .setAuthor(lang.setinfo_succes, message.author.displayAvatarURL)
      .setDescription(newsInfo)
    message.channel.send(notesEmbed).then(()=>{ h.delete()});
  });
  

}

exports.conf = {
    aliases: ['setbio'],
    cooldown: "10"
}

exports.help = {
    name: "setinfo",
    description: "Set your info",
    usage: "setinfo [text]",
  example: 'setinfo [Your Info]'
}
