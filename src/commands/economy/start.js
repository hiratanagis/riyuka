const db = require("quick.db");

exports.run = async(client, msg, args, color, prefix, lang) => {
  let start = await db.fetch(`wood_${msg.author.id}`)
  if (start) return msg.channel.send('You already started the game')
  
  db.set(`pickaxe_${msg.author.id}`, 'wood')
  db.set(`sword_${msg.author.id}`, 'wooden')
  db.set(`rank_${msg.author.id}`, "GUEST")
  db.add(`wood_${msg.author.id}`, 1)
  msg.channel.send('You has started the game.')
}

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "start",
    description: "Start mining and hunting",
    usage: "start"
}