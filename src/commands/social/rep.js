
const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');
let rep = require("../../../src/database/rep.json");

exports.run = async(client, message, args, color, prefix, lang) => {
  
  //if (message.author.id !== '444454206800396309') return message.channel.send('Currently in development');
  if (message.channel.type == "dm") return;  
  
    let cooldown = 8.64e+7,
    amount = 1
  
  let lastrep = await db.fetch(`lastRep_${message.author.id}`)
  if (lastrep !== null && cooldown - (Date.now() - lastrep) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastrep))
        message.channel.send(`**${message.author.username}**, ${lang.rep_limited} ${timeObj.hours} hours, ${timeObj.minutes} minutes and ${timeObj.seconds} seconds`)
    
  } else {
    
    let user = message.mentions.users.first() || client.users.get(args[0]);

    if(!user) return message.channel.send(lang.rep_nomention);
    if (user.bot) return message.channel.send(lang.rep_bot);
    if (user.id == message.author.id) return message.channel.send(lang.rep_yourself);
  if(!rep[user.id]){
    rep[user.id] = {
      rep: 0 
    };
  }
  
  let curRep = rep[user.id].rep;
      
      db.set(`lastRep_${message.author.id}`, Date.now());        
      rep[user.id].rep = curRep + amount;
      fs.writeFile("./src/database/rep.json", JSON.stringify(rep, null, 2), (err) => {
        message.channel.send(`🎖️ | Hey <@${user.id}>, ${lang.rep_gives} ${message.author.tag}`);
      })
  } 
}

exports.conf = {
    aliases: ["reputation"],
    cooldown: "5"
}

exports.help = {
    name: 'rep',
    description: 'Give someone reputation point',
    usage: 'rep [@mention]',
  example: 'rep [@mention]'
}