const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')

exports.run = async (client, message, args, color, prefix, lang) => {
  
  let bal = await db.fetch(`userBalance_${message.author.id}`)

  const Jwork = require('../../../src/work.json');
  const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
  var random = Math.floor(Math.random() * 350) + 100;
  db.add(`userBalance_${message.author.id}`, + random)
    message.channel.send(`**\💼 | ${message.author.username}**, ${JworkR} 💴 **${random}**`)

}
exports.conf = {
    aliases: [],
    cooldown: "20"
}

exports.help = {
    name: "work",
    description: "Go work and get your reward",
    usage: "work"
}
