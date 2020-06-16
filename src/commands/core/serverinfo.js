const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args, color, prfix, lang) => {

  var verificationLevels = ['**None**', '**Low**', '**Medium**', '**(╯°□°）╯︵ ┻━┻** (High)', '**┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻** (Extreme)'];
  var region = {
    "brazi": "**Brazil** :flag_br:",
    "eu-central": "**Central Europe** :flag_eu:",
    "singapore": "**Singapore** :flag_sg:",
    "us-central": "**U.S. Central** :flag_us:",
    "sydney": "**Sydney** :flag_au:",
    "us-east": "**U.S. East** :flag_us:",
    "us-south": "**U.S. South** :flag_us:",
    "us-west": "**U.S. West** :flag_us:",
    "eu-west": "**Western Europe** :flag_eu:",
    "singapore": "**Singapore** :flag_sg:",
    "london": "**London** :flag_gb:",
    "japan": "**Japan** :flag_jp:",
    "russia": "**Russia** :flag_ru:",
    "hongkong": "**Hong Kong** :flag_hk:"
  }
  var embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL)
    .setDescription(`💳 | ID : ${message.guild.id}`)
    .addField(`🌏 | Region`, `${region[message.guild.region]}`, true)
    .setThumbnail(message.guild.iconURL)
    .setColor(color)
    .addField(`⚙ | ${lang.verification_level}`, `${verificationLevels[message.guild.verificationLevel]}`, true)
    .addField('👥 | Members: ', `${message.guild.members.filter(mb => mb.user.bot === false).size} users & ${message.guild.members.filter(mb => mb.user.bot === true).size} bots`, true)
    .addField('😂 | Server Emojis: ', `${message.guild.emojis.size}`, true)
    .addField(`📻 | Total Channel [**${message.guild.channels.size}**]`, `- **${message.guild.channels.filter(m => m.type === 'category').size}** Category \n- **${message.guild.channels.filter(m => m.type === 'text').size}** Text \n- **${message.guild.channels.filter(m => m.type === 'voice').size}** Voice`, true)
    .addField('🏷 | Server Roles: ', `${message.guild.roles.size}`, true)
    .addField(`👑 | ${lang.owner}`, `${message.guild.owner.user.tag} (${message.guild.ownerID})`)
    .addField(`🕒 | ${lang.create_at}`, `${moment(message.guild.createdAt).utcOffset('+0800').format("dddd, MMMM Do YYYY, HH:mm:ss")} WITA`)
    .setFooter(`${message.guild.name} | ${message.guild.owner.user.tag}`)
  message.channel.send(embed)

}

exports.conf = {
  aliases: [],
  cooldown: '10'

}

exports.help = {
  name: "serverinfo",
  description: 'See Server Info',
  usage: 'serverinfo',
  example: 'serverinfo'
}