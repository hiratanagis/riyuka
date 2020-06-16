const { Canvas } = require('canvas-constructor');
const Discord = require('discord.js');
const { get } = require('node-superfetch');
const db = require("quick.db")
let bg = require('../../database/background.json');

exports.run = async (client, message, args, color, prefix, lang) => {
  //variable
  let pickaxe = await db.fetch(`pickaxe_${message.author.id}`)
  let bal = await db.fetch(`userBalance_${message.author.id}`)
  
  if(!bg[message.author.id]){
    bg[message.author.id] = {
      background: 'https://cdn.discordapp.com/attachments/517214088896446466/529803566412595237/20190102_072921.jpg' 
    };
  }
    
  let background = bg[message.author.id].background;
  
if (!args[0]) {
  
  try {    
  async function createCanvas() {
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/565103449390448656/571234010752090112/20190426_151941.png');

  return new Canvas(720, 480)
    .addImage(background1, 0,0,720,480)
    .addBeveledImage(background2, 0,0,720,480)
    .toBufferAsync();
  }
  let m = await message.channel.send('<a:Loading:572827174776733708> Please Wait...');
  const gumen = `To buy something please \`${prefix}market <pickaxe or sword> [number]\`\nTo sell something please \`${prefix}sell <item> <amount>\``;
    message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'market.png')}).then(() => {m.delete()})

  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later.`);
  }
  
/*  let embed = new Discord.RichEmbed()
.setAuthor(client.user.username + " Market", client.user.displayAvatarURL)
.setDescription(`To buy something please \`${prefix}market <pickaxe or sword> [number]\`\nTo sell something please \`${prefix}sell <item> <amount>\``)
.setColor("RANDOM")
.setImage("https://cdn.discordapp.com/attachments/565103449390448656/569326757883281423/20190421_090048.jpg")
message.channel.send(embed)*/
} else if (args[0] == 'pickaxe') {
 if (args[1] == "1" || args[1] == "iron") {
  if (bal <= '80000') return message.reply(`You don't have enough money`);
          const ahkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set yout pickaxe to`)
          .setColor(`RANDOM`)
          .setFooter(`Pickaxe`)
          .setImage(`https://cdn.discordapp.com/emojis/542271493417992223.png?v=1`)
          message.channel.send(ahkkEmbed)
          db.set(`pickaxe_${message.author.id}`, 'iron')
          db.subtract(`userBalance_${message.member.id}`, 80000)
            return; 
  
}
  if (args[1] == "2" || args[1] == "gold") {
    if (bal <= '200000') return message.reply(`You don't have enough money`);
          const ahkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your pickaxe to`)
          .setColor(`RANDOM`)
          .setFooter(`Pickaxe`)
          .setImage(`https://cdn.discordapp.com/emojis/571223204119576576.png?v=1`)
          message.channel.send(ahkkkEmbed)
          db.set(`pickaxe_${message.author.id}`, 'gold')
          db.subtract(`userBalance_${message.member.id}`, 200000)
          return;
    
  }
  if (args[1] == "3" || args[1] == "diamond") {
          if (bal <= '400000') return message.reply(`You don't have enough money`);
          const ahkkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your pickaxe to`)
          .setColor(`RANDOM`)
          .setFooter(`Pickaxe`)
          .setImage(`https://cdn.discordapp.com/emojis/542271517006757889.png?v=1`)
          message.channel.send(ahkkkkEmbed)
          db.set(`pickaxe_${message.author.id}`, 'diamond')
          db.subtract(`userBalance_${message.member.id}`, 400000)
          return;
        }
  if (args[1] == "4" || args[1] == "emerald") {
          if (bal <= '900000') return message.reply(`You don't have enough money`);
          const ahkkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your pickaxe to`)
          .setColor(`RANDOM`)
          .setFooter(`Pickaxe`)
          .setImage(`https://cdn.discordapp.com/emojis/542271541178793995.png?v=1`)
          message.channel.send(ahkkkkEmbed)
          db.set(`pickaxe_${message.author.id}`, 'emerald')
          db.subtract(`userBalance_${message.member.id}`, 900000)
          return;
        }

  } else if (args[0] == 'sword') {
    if (args[1] == "1" || args[1] == "iron") {
  if (bal <= '80000') return message.reply(`You don't have enough money`);
          const ahkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set yout sword to`)
          .setColor(`RANDOM`)
          .setFooter(`Sword`)
          .setImage(`https://cdn.discordapp.com/emojis/569328385474428939.png?v=1`)
          message.channel.send(ahkkEmbed)
          db.set(`sword_${message.author.id}`, 'iron')
          db.subtract(`userBalance_${message.member.id}`, 80000)
            return; 
  
}
  if (args[1] == "2" || args[1] == "gold") {
    if (bal <= '200000') return message.reply(`You don't have enough money`);
          const ahkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your sword to`)
          .setColor(`RANDOM`)
          .setFooter(`Sword`)
          .setImage(`https://cdn.discordapp.com/emojis/571223147169447946.png?v=1`)
          message.channel.send(ahkkkEmbed)
          db.set(`sword_${message.author.id}`, 'gold')
          db.subtract(`userBalance_${message.member.id}`, 200000)
          return;
    
    
    
  }
  if (args[1] == "3" || args[1] == "diamond") {
          if (bal <= '400000') return message.reply(`You don't have enough money`);
          const ahkkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your sword to`)
          .setColor(`RANDOM`)
          .setFooter(`Sword`)
          .setImage(`https://cdn.discordapp.com/emojis/569328351832047636.png?v=1`)
          message.channel.send(ahkkkkEmbed)
          db.set(`sword_${message.author.id}`, 'diamond')
          db.subtract(`userBalance_${message.member.id}`, 400000)
          return;
        }
  if (args[1] == "4" || args[1] == "emerald") {
          if (bal <= '900000') return message.reply(`You don't have enough money`);
          const ahkkkkEmbed = new Discord.RichEmbed()
          .setTitle(`I set your sword to`)
          .setColor(`RANDOM`)
          .setFooter(`Sword`)
          .setImage(`https://cdn.discordapp.com/emojis/569328409717637120.png?v=1`)
          message.channel.send(ahkkkkEmbed)
          db.set(`sword_${message.author.id}`, 'emerald')
          db.subtract(`userBalance_${message.member.id}`, 900000)
          return;
        }
  }
}
exports.conf = {
    aliases: ['shop'],
    cooldown: "5"
}

exports.help = {
    name: "market",
    description: "But a Tools for Mining or Hunting",
    usage: "market <number>"
}