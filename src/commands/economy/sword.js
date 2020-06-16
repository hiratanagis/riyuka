const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(lang.bot_sword);
  let pickaxes = await db.fetch(`sword_${user.id}`)
  let bal = await db.fetch(`userBalance_${user.id}`)

  let name;
  let pickaxe;
  if (pickaxes === "iron") {
    name = 'Iron Sword'
    pickaxe = '<:IronSword:571950328422072320>'
  } else if (pickaxes === "gold") {
    name = 'Golden Sword'
    pickaxe = '<:GoldSword:571950480838885378>'
  } else if (pickaxes === "diamond") {
    name = 'Diamond Sword'
    pickaxe = '<:DiamondSword:571950593988362259>'
  } else if (pickaxes === "emerald") {
    name = 'Emerald Sword'
    pickaxe = '<:EmeraldSword:571950725702221835>'
  } else {
    name = 'Wooden Sword'
    pickaxe = '<:WoodenSword:571950186994204691>'
  }
  
  if(user.id === message.author.id) {
  message.channel.send(`**${user.username}**, ${lang.your_sword} ${pickaxe} **${name}**`);
  } else {
  message.channel.send(`**${user.username}**, ${lang.user_sword} ${pickaxe }**${name}**`) 
}

}
 
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "sword",
    description: "Check Your Sword",
    usage: `sword [@mention]`
}