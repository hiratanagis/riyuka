const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args, color, prefix, lang) => {
//variable system
var pickaxes = await db.fetch(`pickaxe_${message.author.id}`)
var user = message.author

//Ore Count
var StoneCount = Math.floor(Math.random() * 20)
var CoalCount = Math.floor(Math.random() * 15)
var IronCount = Math.floor(Math.random() * 12)
var GoldCount = Math.floor(Math.random() * 8)
var DiamondCount = Math.floor(Math.random() * 5)
var EmeraldCount = Math.floor(Math.random() * 5)
var RedstoneCount = Math.floor(Math.random() * 8)
var LapisCount = Math.floor(Math.random() * 7)
var ObsidianCount = Math.floor(Math.random() * 4)

  if (!pickaxes || pickaxes === null) return message.channel.send(`${lang.nostart} ${prefix}start ${lang.start_mine}`)
  if (!pickaxes || pickaxes === undefined) return message.channel.send(`${lang.nostart} ${prefix}start ${lang.start_mine}`)


 //Mine System
  if(pickaxes == 'iron') {
    let embed = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You mined", `<:emoji_19:571316287704399891> Stone x\`${StoneCount}\`\n<:emoji_21:571316373779906590> Coal x\`${CoalCount}\`\n<:emoji_23:571316548741103646> iron x\`${IronCount}\`\n\nWith your <:IronPickaxe:571949647665299456> Iron Pickaxe`)
  .setTimestamp()
    message.channel.send('<:IronPickaxe:571949647665299456> Mining...').then(async msg => {
  setTimeout(() => {
    msg.edit(embed);
  }, 1000)
    })
   db.add(`Ore_${message.author.id}.stone`, StoneCount)
   db.add(`Ore_${message.author.id}.coal`, CoalCount)
   db.add(`Ore_${message.author.id}.iron`, IronCount)
    
    
  } else if(pickaxes == 'gold') {
    let embed = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You mined", `<:emoji_19:571316287704399891> Stone x\`${StoneCount}\`\n<:emoji_21:571316373779906590> Coal x\`${CoalCount}\`\n<:emoji_23:571316548741103646> iron x\`${IronCount}\`\n<:emoji_22:571316430549811203> Gold x\`${GoldCount}\`\n<:emoji_23:571316467610681404> Diamond x\`${DiamondCount}\`\n\nWith your <:GoldPickaxe:571949781564522517> Golden Pickaxe`)
  .setTimestamp()
    message.channel.send('<:GoldPickaxe:571949781564522517> Mining...').then(async msg => {
  setTimeout(() => {
    msg.edit(embed);
  }, 1000)
    })
   db.add(`Ore_${message.author.id}.stone`, StoneCount)
   db.add(`Ore_${message.author.id}.coal`, CoalCount)
   db.add(`Ore_${message.author.id}.iron`, IronCount)
   db.add(`Ore_${message.author.id}.gold`, GoldCount)
   db.add(`Ore_${message.author.id}.diamond`, DiamondCount)
    
    
  } else if (pickaxes == 'diamond') {
    let embeda = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You mined", `<:emoji_19:571316287704399891> Stone x\`${StoneCount}\`\n<:emoji_21:571316373779906590> Coal x\`${CoalCount}\`\n<:emoji_23:571316548741103646> iron x\`${IronCount}\`\n<:emoji_22:571316430549811203> Gold x\`${GoldCount}\`\n<:emoji_23:571316467610681404> Diamond x\`${DiamondCount}\`\n<:emoji_25:571316657151016970> Emerald x\`${EmeraldCount}\`\n<:emoji_26:571316702151835667> Redstone x\`${RedstoneCount}\`\n\nWith your <:DiamondPickaxe:571949922837069824> Diamond Pickaxe`) 
    .setTimestamp()
    message.channel.send('<:DiamondPickaxe:571949922837069824> Mining...').then(async msg => {
  setTimeout(() => {
    msg.edit(embeda);
  }, 1000)
    })
   db.add(`Ore_${message.author.id}.stone`, StoneCount)
   db.add(`Ore_${message.author.id}.coal`, CoalCount)
   db.add(`Ore_${message.author.id}.iron`, IronCount)
   db.add(`Ore_${message.author.id}.gold`, GoldCount)
   db.add(`Ore_${message.author.id}.diamond`, DiamondCount)
   db.add(`Ore_${message.author.id}.emerald`, EmeraldCount)
   db.add(`Ore_${message.author.id}.redstone`, RedstoneCount)
    
    
  } else if (pickaxes == 'emerald') {
    let embedb = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You mined", `<:emoji_19:571316287704399891> Stone x\`${StoneCount}\`\n<:emoji_21:571316373779906590> Coal x\`${CoalCount}\`\n<:emoji_23:571316548741103646> iron x\`${IronCount}\`\n<:emoji_22:571316430549811203> Gold x\`${GoldCount}\`\n<:emoji_23:571316467610681404> Diamond x\`${DiamondCount}\`\n<:emoji_25:571316657151016970> Emerald x\`${EmeraldCount}\`\n<:emoji_26:571316702151835667> Redstone x\`${RedstoneCount}\`\n<:emoji_26:571316728907169802> Lapis Lazuli x\`${LapisCount}\`\n<:Obsidian:571954720596295685> Obsidian x\`${ObsidianCount}\`\n\nWith your <:EmeraldPickaxe:571950033713496075> Emerald Pickaxe`)
    .setTimestamp()
    message.channel.send('<:EmeraldPickaxe:571950033713496075> Mining...').then(async msg => {
  setTimeout(() => {
    msg.edit(embedb);
  }, 1000)
    })
   db.add(`Ore_${message.author.id}.stone`, StoneCount)
   db.add(`Ore_${message.author.id}.coal`, CoalCount)
   db.add(`Ore_${message.author.id}.iron`, IronCount)
   db.add(`Ore_${message.author.id}.gold`, GoldCount)
   db.add(`Ore_${message.author.id}.diamond`, DiamondCount)
   db.add(`Ore_${message.author.id}.emerald`, EmeraldCount)
   db.add(`Ore_${message.author.id}.redstone`, RedstoneCount)
   db.add(`Ore_${message.author.id}.lapis`, LapisCount)
   db.add(`Ore_${message.author.id}.obsidian`, ObsidianCount)
    
    
  } else if(pickaxes == 'wood') {
    let emebed = new Discord.RichEmbed()
     .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You mined", `<:emoji_19:571316287704399891> Stone x\`${StoneCount}\`\n<:emoji_21:571316373779906590> Coal x\`${CoalCount}\`\n\nWith your <:WoodenPickaxe:571949371222917121> Wooden Pickaxe`)
  .setTimestamp()
    message.channel.send('<:WoodenPickaxe:571949371222917121> Mining...').then(async msg => {
  setTimeout(() => {
    msg.edit(emebed);
  }, 1000)
    })
   db.add(`Ore_${message.author.id}.stone`, StoneCount)
   db.add(`Ore_${message.author.id}.coal`, CoalCount)
  }
}
exports.conf = {
    aliases: [],
    cooldown: "7"
}

exports.help = {
    name: "mine",
    description: "Mining Resource",
    usage: "mine"
}