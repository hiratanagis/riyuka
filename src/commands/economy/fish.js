const fishes = require('../../assets/json/fishy');
const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, color, prefix, lang) => {

  if(!args[0]){
  
  let curBal = await db.fetch(`userBalance_${message.author.id}`);
  
  const fishID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (fishID < 5) rarity = 'junk';
		else if (fishID < 8) rarity = 'common';
		else if (fishID < 9) rarity = 'uncommon';
    else if (fishID < 10) rarity = 'rare';
		else rarity = 'legendary';
		const fish = fishes[rarity];
		const worth = client.util.randomRange(fish.min, fish.max);
    db.add(`userBalance_${message.author.id}`, + worth)
    message.channel.send(`🎣 **${message.author.username}**, ${lang.caught} ${fish.symbol}. ${lang.fish_sell} 💴 **${worth}**.`);
    
  }
  if(args[0] === 'list' || args[0] === 'reward'){
    
    let lEmbed = new Discord.RichEmbed() 
    .setColor(color)
    .setAuthor(lang.fish_reward)
    .setDescription(`
\`\`\`🔧Junk      :: max reward: 20, min reward: 5

🐟Common    :: max reward: 100, min reward: 40

🐠Uncommon  :: max reward: 200, min reward: 75

🦑Rare      :: max reward: 250, min reward: 100

🐋Legendary :: max reward: 500, min reward: 200\`\`\`
**All reward are random from max/min**
​
`)
    .setFooter(`Request by: ${message.author.tag} | ${client.user.username}`)
    message.channel.send(lEmbed);
  } 
  
	}

exports.conf = {
    aliases: ['fishy', 'fishing'],
    cooldown: "25"
}

exports.help = {
    name: "fish",
    description: "Go Fishing",
    usage: "fish [list]"
}
