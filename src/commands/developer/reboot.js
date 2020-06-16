const Discord = require('discord.js');
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args) => {
  
  owners_id.forEach(async function(owner) {
    if(message.author.id !== owner) return;

    message.channel.send("<a:Loading:572827174776733708> Rebooting...").then(m => {
        setTimeout(() => {
            m.edit("<a:Centang:571969673436856330> Done.");
        }, 2000);
    })
    .then(msg => {
      setTimeout(() => {process.exit()}, 5000)
    })
    .then(() => client.login(process.env.BOT_TOKEN))
  });
 }

exports.conf = {
   aliases: ['shutdown', 'rb'], 
   cooldown: '' 
}

exports.help = {
  name: 'reboot',
  description: 'This will reboot the bot instance.',
  usage: 'reboot'
};