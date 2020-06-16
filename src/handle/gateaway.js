const Discord = require("discord.js")
const { Collection } = require('discord.js')
const hook = new Discord.WebhookClient("660338793974333450", "wga0bCFJlFTYwQFFMiLxc9eBOWhfgTp2Tg9rjoBeDpOife0b2fXKnpRE1-K7K308_JE9");
const cooldown = new Collection()
const { owners_id } = require("../config.json")
const { blacklist_id } = require("../config.json")

const { utt } = require("../globalchattitle.json")


module.exports = async (client, message) => {
  let devlist = owners_id
  var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.exec(message.cleanContent);

  if (expression != null && !devlist.includes(message.author.id)) {
    return message.delete().then(msgs => {
      message.reply('${message.author.tag} Dont post link please').then(msg => msg.delete(5000))
    })        
  }
  //COOLDOWN GLOBALCHAT
  let lastTimestamp = cooldown.get(message.author.id)

  
  if (lastTimestamp !== null && 3000 - (Date.now() - lastTimestamp) > 0) {
    return;// message.channel.send(`**${message.author.username}**, slow down chat > cooldown!`)
    
  } else {
    cooldown.set(message.author.id, Date.now())
  //GlobalChat and Developer list chat
      client.gateaway.all().forEach(db => {
      let image = message.attachments.first()
      let channel = client.channels.get(JSON.parse(db.data).channel) 
      let inviteEmbed = new Discord.RichEmbed()

      
  //developer chat name
      .setAuthor(`${message.guild.name}`, message.guild.iconURL)
      //.setDescription(message.content)
      if (message.content) inviteEmbed.setDescription(message.content) // KALO KITA NGIRIM PESAN GK PAKE GAMBAR, MESSAGE KITA GK KE SEND
      if (image) inviteEmbed.setImage(image.proxyURL)
      .setTimestamp()
//Developer
      if (devlist.includes(message.author.id)){
        inviteEmbed.setFooter(`👑 » Developer | ${message.author.tag}`, message.author.avatarURL)
        inviteEmbed.setColor("#00c3ff")

//Under The Tree
        } else if (utt.includes(message.author.id)){
        inviteEmbed.setFooter(`🌳 » UTT | ${message.author.tag}`, message.author.avatarURL)
        inviteEmbed.setColor("#02e60a")
        
      } else if (blacklist_id.includes(message.author.id)){
        
        return undefined
       
      } else {
        inviteEmbed.setFooter(message.author.tag, message.author.avatarURL)
          .setColor("#DC7633")
         
      }
       
      if (channel && channel.id !== message.channel.id) {
        channel.send(inviteEmbed)
      }
    })
  hook.send(`**${message.author.tag}** [\`${message.author.id}\`] using \`globalchat\` in guild **${message.guild.name}** [\`${message.guild.id}\`] : \`\`\`${message.content}\`\`\``)
    
  } 
  return
}








