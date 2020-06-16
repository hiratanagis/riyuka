const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');

exports.run = async(client, message, args, color, prefix, lang) => {
  let cooldown = 8.64e+7
  let amount = 500
  
  try {
  let cooldownt = await db.fetch(`lastDaily_${message.author.id}`)
  let timeObj = ms(cooldown - (Date.now() - cooldownt))
  
  if (cooldownt !== null && cooldown - (Date.now() - cooldownt) > 0) {
     message.channel.send(`${lang.daily_cooldown} **${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s**`)        
  
  } else { 
    db.add(`userBalance_${message.author.id}`, + amount) 
    db.set(`lastDaily_${message.author.id}`, Date.now()) 
    message.channel.send(`:tada: ${lang.collect} daily <a:money:572837520585261066> ${amount} balance`) 
  }
  } catch (e) {
    console.log(e)
  }
}

exports.conf = {
    aliases: ["daily"],
    cooldown: "10"
}

exports.help = {
    name: 'daily',
    description: 'Get balance everyday',
    usage: 'daily'
}