const fs = require('fs');
const db = require('quick.db')

exports.run = async (client, message, args, color, prefix, lang) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);
  let f = args.slice(1).join(" ");

  if(!user) return message.channel.send(lang.mention_noinput);
  if (user.id == message.author.id) return message.channel.send(lang.transfer_yourself);
  if(user.bot) return message.channel.send(lang.transfer_bot);
  if(!f) return message.channel.send(lang.transfer_noinput);
	if(isNaN(f)) return message.channel.send(lang.amount_failed);
  
  let bal = await db.fetch(`userBalance_${message.author.id}`)

  if(bal == null || bal < args[1]) return message.channel.send(lang.no_balance);
  
  db.add(`userBalance_${user.id}`, + f)
  db.add(`userBalance_${message.member.id}`, -f)
    user.send(`\🏧  | **Transfer Receipt**\`\`\`You have received 💴 ${f} from user ${message.author.tag}\n(ID: ${message.author.id})\`\`\``);
    message.channel.send(`Transaction completed! **${message.author.username}**, :yen: **${f}** ${lang.balance_deducted}`); 

}

exports.conf = {
    aliases: ['tf'],
    cooldown: "7"
}

exports.help = {
    name: "transfer",
    description: "Transfer balance to other user",
    usage: "transfer [@user|id] [amount]"
}
