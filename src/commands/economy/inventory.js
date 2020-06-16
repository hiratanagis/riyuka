const { Canvas } = require('canvas-constructor');
const Discord = require('discord.js');
const { get } = require('node-superfetch');
const db = require("quick.db")
let bg = require('../../database/background.json');

exports.run = async (client, message, args, color, prefix, lang) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(`**${message.author.username}**, Bot not have inventory!`);
  
  if(!bg[user.id]){
    bg[user.id] = {
      background: 'https://cdn.discordapp.com/attachments/517214088896446466/529803566412595237/20190102_072921.jpg' 
    };
  }
    
  let background = bg[user.id].background;
  
  const balance = await db.fetch(`userBalance_${user.id}`)
  let pickaxes = await db.fetch(`pickaxe_${user.id}`)
  let swords = await db.fetch(`sword_${user.id}`)
  
  let OreStone = await db.fetch(`Ore_${user.id}.stone`)
  let OreCoal = await db.fetch(`Ore_${user.id}.coal`)
  let OreIron = await db.fetch(`Ore_${user.id}.iron`)
  let OreGold = await db.fetch(`Ore_${user.id}.gold`)
  let OreDiamond = await db.fetch(`Ore_${user.id}.diamond`)
  let OreEmerald = await db.fetch(`Ore_${user.id}.emerald`)
  let OreRedstone = await db.fetch(`Ore_${user.id}.redstone`)
  let OreLapis = await db.fetch(`Ore_${user.id}.lapis`)
  let Obsidian = await db.fetch(`Ore_${user.id}.obsidian`)
  
   let Zombie = await db.fetch(`Mobs_${user.id}.zombie`)
   let Skeleton = await db.fetch(`Mobs_${user.id}.skeleton`)
   let Creeper = await db.fetch(`Mobs_${user.id}.creeper`)
   let Drowned = await db.fetch(`Mobs_${user.id}.drowned`)
   let Husk = await db.fetch(`Mobs_${user.id}.husk`)
   let Enderman = await db.fetch(`Mobs_${user.id}.enderman`)
   let Spider = await db.fetch(`Mobs_${user.id}.spider`)
   
  let pickaxe; // wait
  if (pickaxes == 'iron') {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/569305444749934592/542271493417992223.png' //:v
  } else if (pickaxes == 'gold') {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/571178534538575873/1556249928473.png' //:v
  } else if (pickaxes == 'diamond') {
     pickaxe = `https://cdn.discordapp.com/attachments/565103449390448656/569305478270681088/542271517006757889.png` 
  } else if (pickaxes == 'emerald') {
     pickaxe = `https://cdn.discordapp.com/attachments/565103449390448656/571178855709278219/1556250038942.png`
  } else {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/569305413003247686/542271456537477120.png';
  }
  
  let sword; // wait
  if (swords == 'iron') {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/569309206751084564/Iron_Sword.png' //:v
  } else if (swords == 'gold') {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/571178550518874113/unnamed.png' //:v
  } else if (swords == 'diamond') {
     sword = `https://cdn.discordapp.com/attachments/565103449390448656/569309151528878080/image.png` 
  } else if (swords == 'emerald') {
     sword = `https://cdn.discordapp.com/attachments/565103449390448656/569309850379616256/unnamed.png`
  } else {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/569309304696340500/Wooden_Sword.png';
  }
  
  try {    
  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = user.username;
    var jadim = namam.length > 20 ? namam.substring(0, 22) + "..." : namam;
    var {body: avatar} = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size128"));
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/565103449390448656/570919103951273985/20190425_182818.png');
    var {body: Pickaxe} = await get(pickaxe);
    var {body: Swordss} = await get(sword);

  return new Canvas(600, 400)
    .setColor('#ffffff')
    .addImage(background1, 0,0,600,400)
    .addBeveledImage(background2, 0,0,600,400)
    .addImage(Pickaxe, 470, 73, 45, 45)
    .addImage(Swordss, 530, 73, 45,45)
    .setTextFont('bold 30px Courier New')
    .setTextAlign('left')
    .addText(`${jadim}`, 170, 47)
    .setTextFont('bold 30px Courier New')
    
    .setTextAlign('left')
    .addText(`${OreStone ?  `${OreStone}` : '0'}`, 60, 174)
    .addText(`${OreCoal ?  `${OreCoal}` : '0'}`, 60, 225)
    .addText(`${OreIron ?  `${OreIron}` : '0'}`, 60, 275)
    .addText(`${OreGold ?  `${OreGold}` : '0'}`, 60, 325)
    .addText(`${OreDiamond ?  `${OreDiamond}` : '0'}`, 60, 372)
    
    .addText(`${Zombie ?  `${Zombie}` : '0'}`, 360, 174)
    .addText(`${Skeleton ?  `${Skeleton}` : '0'}`, 360, 225)
    .addText(`${Creeper ?  `${Creeper}` : '0'}`, 360, 275)
    .addText(`${Drowned ?  `${Drowned}` : '0'}`, 360, 325)
    .addText(`${Husk ?  `${Husk}` : '0'}`, 360, 372)
    
    .setTextAlign('right')
    .addText(`${OreEmerald ?  `${OreEmerald}` : '0'}`, 243, 174)
    .addText(`${OreRedstone ?  `${OreRedstone}` : '0'}`, 243, 225)
    .addText(`${OreLapis ?  `${OreLapis}` : '0'}`, 243, 275)
    .addText(`${Obsidian ?  `${Obsidian}` : '0'}`, 243, 325)
    
    .addText(`${Enderman ?  `${Enderman}` : '0'}`, 537, 174)
    .addText(`${Spider ?  `${Spider}` : '0'}`, 537, 225)
    
    .setTextAlign('left')
    .setTextFont('bold 25px Courier New')
    .addText(`Balance:\n¥${balance ?  `${balance}` : '0'}`, 170, 90)
    .addRoundImage(avatar, 10, 10, 120, 120, 120/2)
    .toBufferAsync();
  }
  let m = await message.channel.send('<a:Loading:572827174776733708> Please Wait...');
  const gumen = `Inventory for **${user.tag}**`;
    message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'inventory.png')}).then(() => {m.delete()})

  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later.`);
  } 
  
}

exports.conf = {
    aliases: ['inv'],
    cooldown: "10"
}

exports.help = {
    name: "inventory",
    description: "Show All Inventory for You",
    usage: "inventory [@mention]"
}