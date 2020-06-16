const Discord = module.require("discord.js");

exports.run = async (client, message, args, color, prefix, lang) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name} Icon`)
        .addField(`Links`, `[${lang.click_here}](${message.guild.iconURL})`)
        .setImage(message.guild.iconURL)
        .setColor(color)
    await message.channel.send(embed)
}

exports.conf = {
  aliases: [],
  cooldown: '5'
}

exports.help = {
  name: "servericon",
  description: "See Server Icon",
  usage: 'servericon',
  example: 'servericon'
}