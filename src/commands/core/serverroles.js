exports.run = async (client, message, args, color, prefix, lang) => {

 const WxArtzEmbedBiarSyantik = require('discord.js').RichEmbed;

	let number = message.guild.roles.array().sort().map((x,i) => `\`${i+1}\` - ${x.toString()}`)
	number = chunk(number, 10);

	let index = 0;
  const ge = new WxArtzEmbedBiarSyantik()
  .setColor(color)
  .setAuthor(`| Server Roles List [${message.guild.roles.size}]`, message.guild.iconURL)
  .addField(`${message.guild.owner.user.tag}`, `(${message.guild.ownerID})`)
  .setDescription(number[index].join('\n'))
  .setFooter(`${lang.page} ${index+1} ${lang.of} ${number.length}`)
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
    ge.setFooter(`${lang.page} ${index+1} ${lang.of} ${number.length}`)
		await m.edit(ge);
		return awaitReaction();
	}
	return awaitReaction();

}
function chunk(array, chunkSize) {
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }
  
exports.conf = {
  aliases: ["srl"],
  cooldown: 10
}

exports.help = {
  name: "serverroles",
  description: "Show guild roles",
  usage: "serverroles",
  example: 'serverroles'
}
