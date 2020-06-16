const Discord = require("discord.js") 
const { owners_id } = require("../../config.json");

exports.run = async (bot, message, args) => {
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return; 
  
    
	const embed = require('discord.js').RichEmbed;
	let number = bot.guilds.array().sort().map((x,i) => `\`${i+1}\` - ${x.name}(\`${x.id}\`)`)//.join('\n')
	number = chunk(number, 10);

	let index = 0;
	const ge = new embed ()
		.setColor("RANDOM")
		.setAuthor(`🌍 | Guild List [${bot.guilds.size}]`, message.author.displayAvatarURL)
		.setDescription(number[index].join('\n'))
		.setFooter(`Page ${index+1} of ${number.length}`)
	const m = await message.channel.send(ge);
	await m.react('⬅');
	await m.react('🔴');
	await m.react('➡');
	async function awaitReaction(){
		const filter =(rect, usr) => ['⬅', '🔴','➡' ].includes(rect.emoji.name) && usr.id === message.author.id
		const response = await m.awaitReactions(filter, {
			max: 1,
			time: 30000
		});
		if(!response.size){
			return undefined;
		}
		const emoji = response.first().emoji.name;
		if(emoji === '⬅') index--;
		if(emoji === '🔴')  m.delete();
		if(emoji === '➡') index++;

		index = ((index % number.length) + number.length) % number.length;
		ge.setDescription(number[index].join('\n'))
		ge.setFooter(`Page ${index+1} of ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();
  });
}	
function chunk(array, chunkSize) {
	const temp = [];
	for(let i = 0; i < array.length; i+= chunkSize){
		temp.push(array.slice(i, i+chunkSize));
		}
	return temp;
}                  
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "serverlist",
    description: "Cek list server dari bot",
    usage: "serverlist"
}