const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(lang.bot_pickaxe);
  let pickaxes = await db.fetch(`pickaxe_${user.id}`)
  let bal = await db.fetch(`userBalance_${user.id}`)
  
  let name;
  let pickaxe;
  if (pickaxes === "iron") {
    name = 'Iron Pickaxe'
    pickaxe = '<:IronPickaxe:571949647665299456>'
  } else if (pickaxes === 'gold') {
    name = 'Golden Pickaxe'
    pickaxe = '<:GoldPickaxe:571949781564522517>'
  } else if (pickaxes === "diamond") {
    name = 'Diamond Pickaxe'
    pickaxe = '<:DiamondPickaxe:571949922837069824>'
  } else if (pickaxes === "emerald") {
    name = 'Emerald Pickaxe'
    pickaxe = '<:EmeraldPickaxe:571950033713496075>'
  } else {
    name = 'Wooden Pickaxe'
    pickaxe = '<:WoodenPickaxe:571949371222917121>'
  }
  
  if(user.id === message.author.id) {
  message.channel.send(`**${user.username}**, ${lang.your_pickaxe} ${pickaxe} **${name}**`);
  } else {
  message.channel.send(`**${user.username}**, ${lang.user_pickaxe} ${pickaxe} **${name}**`) 
}

}
 
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "pickaxe",
    description: "Check Your Pickaxe",
    usage: `pickaxe [@mention]`
}