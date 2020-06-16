const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) user = message.author;
  if(user.bot) return message.reply(lang.bot_nobalance);
  
  let balance = await db.fetch(`userBalance_${user.id}`)
  
  if (balance == 0 || balance == null) {
    message.channel.send(lang.no_balance);
  } else if(user.id === message.author.id) {
  message.channel.send(`<a:money:572837520585261066> **${user.username}**, ${lang.balance} 💴 **${balance}**`);
  } else {
  message.channel.send(`**${user.username}** ${lang.have} 💴 **${balance}** balance`) 
}
}

exports.conf = {
    aliases: ["bal"],
    cooldown: "10"
}

exports.help = {
    name: 'balance',
    description: 'See your balance',
    usage: 'balance [@mention]'
}