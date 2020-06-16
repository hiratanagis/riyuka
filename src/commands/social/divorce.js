const db = require('quick.db');

exports.run = async(client, message, args, color, prefix, lang) => {

  var user = message.mentions.users.first();
  if(!user) return message.channel.send(lang.divorce_nomention);
  
  let married = await db.fetch(`married_${message.author.id}-${user.id}`);
  if(!married) return message.channel.send(lang.divorce_notmarry);
  let marrys = await db.fetch(`married_${user.id}-${message.author.id}`);
  if(!marrys) return message.channel.send(lang.divorce_notmarry);
  let m = await message.reply(lang.divorce_question.replace('%username', `**${user.username}**?`)) 
  const hit = await client.util.verifyText(message.channel, message.author);
  if(hit) {
    message.channel.send(lang.divorce_yes) 
    db.delete(`marry_${message.author.id}`) 
    db.delete(`married_${message.author.id}-${user.id}`)
    db.delete(`married_${user.id}-${message.author.id}`) 
    db.delete(`marry_${user.id}`)
  } else {
    message.channel.send(`Okay ${message.author}, ${lang.divorce_no} **${user.username}**.`);
  } 
} 

exports.conf = {
  aliases: [], 
  cooldown: '5'
}
exports.help = {
  name: 'divorce', 
  description: 'Divorce someone', 
  usage: 'divorce <@user>',
  example: 'divorce [@mention]'
} 