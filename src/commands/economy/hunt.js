const db = require("quick.db")
const Discord = require("discord.js")

exports.run = async (client, message, args, color, prefix, lang) => {
 let swords = await db.fetch(`sword_${message.author.id}`)
 if (!swords || swords === null) return message.channel.send(`${lang.nostart} ${prefix}start ${lang.start_hunt}`)
 if (!swords || swords === undefined) return message.channel.send(`${lang.nostart} ${prefix}start ${lang.start_hunt}`)
var user = message.author

//Ore Count
var ZombieCount = Math.floor(Math.random() * 12)
var SkeletonCount = Math.floor(Math.random() * 11)
var CreeperCount = Math.floor(Math.random() * 9)
var DrownedCount = Math.floor(Math.random() * 8)
var HuskCount = Math.floor(Math.random() * 6)
var EndermanCount = Math.floor(Math.random() * 4)
var SpiderCount = Math.floor(Math.random() * 10)

 //Hunt System
  if(swords == 'wooden') {
    let emebed = new Discord.RichEmbed()
     .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You hunted", `<:ZombieHead:571952267624972288> Zombie x\`${ZombieCount}\`\n<:SkeletonHead:571952400844455936> Skeleton x\`${SkeletonCount}\`\n\nWith your <:WoodenSword:571950186994204691> Wooden Sword`)
  .setTimestamp()
    message.channel.send('<:WoodenSword:571950186994204691> Hunting...').then(async msg => {
  setTimeout(() => {
    msg.edit(emebed);
  }, 1000)
    })
   db.add(`Mobs_${message.author.id}.zombie`, ZombieCount)
   db.add(`Mobs_${message.author.id}.skeleton`, SkeletonCount)
    
    
  } else if(swords == 'iron') {
    let embed = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You Hunted", `<:ZombieHead:571952267624972288> Zombie x\`${ZombieCount}\`\n<:SkeletonHead:571952400844455936> Skeleton x\`${SkeletonCount}\`\n<:CreeperHead:571952517492113429> Creeper x\`${CreeperCount}\`\n\nWith your <:IronSword:571950328422072320> Iron Sword`)
  .setTimestamp()
    message.channel.send('<:IronSword:571950328422072320> Hunting...').then(async msg => {
  setTimeout(() => {
    msg.edit(embed);
  }, 1000)
    })
   db.add(`Mobs_${message.author.id}.zombie`, ZombieCount)
   db.add(`Mobs_${message.author.id}.skeleton`, SkeletonCount)
   db.add(`Mobs_${message.author.id}.creeper`, CreeperCount)
    
     
  } else if(swords == 'gold') {
    let emebed = new Discord.RichEmbed()
     .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You hunted", `<:ZombieHead:571952267624972288> Zombie x\`${ZombieCount}\`\n<:SkeletonHead:571952400844455936> Skeleton x\`${SkeletonCount}\`\n<:CreeperHead:571952517492113429> Creeper x\`${CreeperCount}\`\n<:DrownedHead:571952686082031616> Drowned x\`${DrownedCount}\`\n\nWith your <:GoldSword:571950480838885378> Golden Sword`)
  .setTimestamp()
    message.channel.send('<:GoldSword:571950480838885378> Hunting...').then(async msg => {
  setTimeout(() => {
    msg.edit(emebed);
  }, 1000)
    })
   db.add(`Mobs_${message.author.id}.zombie`, ZombieCount)
   db.add(`Mobs_${message.author.id}.skeleton`, SkeletonCount)
   db.add(`Mobs_${message.author.id}.creeper`, CreeperCount)
   db.add(`Mobs_${message.author.id}.drowned`, DrownedCount)
    
    
  } else if (swords == 'diamond') {
    let embeda = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You hunted", `<:ZombieHead:571952267624972288> Zombie x\`${ZombieCount}\`\n<:SkeletonHead:571952400844455936> Skeleton x\`${SkeletonCount}\`\n<:CreeperHead:571952517492113429> Creeper x\`${CreeperCount}\`\n<:DrownedHead:571952686082031616> Drowned x\`${DrownedCount}\`\n<:Spider:571953394747703296> Spider x\`${SpiderCount}\`\n\nWith your <:DiamondSword:571950593988362259> Diamond Sword`) 
    .setTimestamp()
    message.channel.send('<:DiamondSword:571950593988362259> Hunting...').then(async msg => {
  setTimeout(() => {
    msg.edit(embeda);
  }, 1000)
    })
   db.add(`Mobs_${message.author.id}.zombie`, ZombieCount)
   db.add(`Mobs_${message.author.id}.skeleton`, SkeletonCount)
   db.add(`Mobs_${message.author.id}.creeper`, CreeperCount)
   db.add(`Mobs_${message.author.id}.drowned`, DrownedCount)
   db.add(`Mobs_${message.author.id}.spider`, SpiderCount)
    
    
  } else if (swords == 'emerald') {
    let embedb = new Discord.RichEmbed()
   .setAuthor(user.username, user.avatarURL)
   .setColor("RANDOM")                                      
   .addField("You hunted", `<:ZombieHead:571952267624972288> Zombie x\`${ZombieCount}\`\n<:SkeletonHead:571952400844455936> Skeleton x\`${SkeletonCount}\`\n<:CreeperHead:571952517492113429> Creeper x\`${CreeperCount}\`\n<:DrownedHead:571952686082031616> Drowned x\`${DrownedCount}\`\n<:HuskHead:571953006472462356> Husk x\`${HuskCount}\`\n<:EndermanHead:571953099246141451> Enderman x\`${EndermanCount}\`\n<:Spider:571953394747703296> Spider x\`${SpiderCount}\`\n\nWith your <:EmeraldSword:571950725702221835> Emerald Sword`)
    message.channel.send('<:EmeraldSword:571950725702221835> Hunting...').then(async msg => {
  setTimeout(() => {
    msg.edit(embedb);
  }, 1000)
    })
   db.add(`Mobs_${message.author.id}.zombie`, ZombieCount)
   db.add(`Mobs_${message.author.id}.skeleton`, SkeletonCount)
   db.add(`Mobs_${message.author.id}.creeper`, CreeperCount)
   db.add(`Mobs_${message.author.id}.drowned`, DrownedCount)
   db.add(`Mobs_${message.author.id}.husk`, HuskCount)
   db.add(`Mobs_${message.author.id}.enderman`, EndermanCount)
   db.add(`Mobs_${message.author.id}.spider`, SpiderCount) 
  }
  } 
  
exports.conf = {
    aliases: [],
    cooldown: "7"
}

exports.help = {
    name: "hunt",
    description: "Hunt a Mobs",
    usage: "hunt"
}