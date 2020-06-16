const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');

exports.run = async(client, message, args, color, prefix, lang) => {
  let cooldown = 2.592e+9
  let amount = 10000
  
  try {
  let cooldownt = await db.fetch(`lastMonthly_${message.author.id}`)
  let timeObj = ms(cooldown - (Date.now() - cooldownt))
  
  if (cooldownt !== null && cooldown - (Date.now() - cooldownt) > 0) {
     message.channel.send(`${lang.monthly_cooldown} **${timeObj.days}d ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s**`)        
  
  } else { 
    db.add(`userBalance_${message.author.id}`, + amount) 
    db.set(`lastMonthly_${message.author.id}`, Date.now()) 
    message.channel.send(`:tada: ${lang.collect} monthly <a:money:572837520585261066>${amount} balance`) 
  }
  } catch (e) {
    console.log(e)
  }
}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: 'monthly',
    description: 'Get balance everymonth',
    usage: 'monthly'
}