const Discord = require('discord.js');
const { owners_id } = require('../../config.json');
exports.run = async (bot, message, args, prefix) => {
  message.delete();
  owners_id.forEach(async function(owner) {
  if (message.author.id !== owner) return;
  let dm = args.join(" ");
  if(!dm) return message.channel.send('Masukan Pesan Yang ingin Dikirim');
  
  message.guild.members.forEach(member => {
    if (member.id != bot.user.id && !member.user.bot) member.send(dm);
    });
  message.channel.send('Succes Dm All Member on this server')
  });
}
exports.conf = {
    aliases: []
}

exports.help = {
    name: 'dmall',
    description: 'To DM All Memmber On This Server',
    usage: 'dmall <message>' 
}