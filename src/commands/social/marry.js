const Discord = require('discord.js')
const db = require('quick.db')
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

exports.run = async (client, message, args, color, prefix, lang) => {
  
 const user = message.mentions.users.first();
  
  if (!user) return message.channel.send(lang.marry_nomention)
  if(user.id === message.author.id) return message.channel.send(lang.marry_yourself)
  if(user.id === client.user.id) return message.channel.send(lang.marry_bot)
  if(user.bot) return message.channel.send(lang.marry_anotherbot);
  
    const marrys = await db.fetch(`marry_${user.id}`)
    if(marrys) return message.channel.send(lang.marry_already)
    const married = await db.fetch(`marry_${message.author.id}`) 
    if(married) return message.channel.send(lang.marry_multiple);
  
  message.channel.send(`${user}, **${message.author.username}** ${lang.marry_question}`)
  const hit = await verifyText(message.channel, user)
  if(hit) {
  db.set(`marry_${message.author.id}`, user.username)
  db.set(`married_${message.author.id}-${user.id}`, true);
  db.set(`marry_${user.id}`, message.author.username)
  db.set(`married_${user.id}-${message.author.id}`, true);
    
  message.channel.send(`${user} ${lang.marry_yes.replace('%author', message.author)}`)
  } else {
    message.channel.send(`${message.author}, ${lang.marry_no.replace('%user', user.tag)}`);
  } 
}

async function verifyText(channel, user, time = 30000) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true;
		if (no.includes(choice)) return false;
		return false;
	}

exports.conf = {
  aliases: [], 
  cooldown: '5'
} 

exports.help = {
  name: 'marry', 
  description: 'Marry someone', 
  usage: 'marry @SomeOne',
  example: 'marry [@mention]'
} 