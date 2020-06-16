const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, color, prefix, lang) => {
  let embed = new RichEmbed()
    .setColor(color)
    .setAuthor("Station List", client.user.displayAvatarURL)
    .setDescription(
      `hi, my name is ${client.user.username}. my prefix is \`${prefix}\`
**Usage:** \`${prefix}stream <stationlist>\`
**Example:** \`${prefix}stream ncs\``
    )
    .addField(
      "General Stream",
      `• jpop
• kpop
• noisefm
• anime
• nightcore
• ncs
• gaming`,
      true
    )
    .addField(
      "Lo-Fi Stream",
      `• chillhop
• college-music \`/\` college
• mellowbeat
• shiloh \`/\` shiloh-dynasty \`/\` shilohdynasty
• nourish
• inyourchill \`/\` in-your-chill`,
      true
    );

  message.channel.send(embed);
};
exports.conf = {
  aliases: [],
  cooldown: ""
};

exports.help = {
  name: "stationlist",
  description: "Check Available Station",
  usage: "stationlist",
  example: 'stationlist'
};
