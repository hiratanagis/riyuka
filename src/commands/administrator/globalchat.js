const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix, lang) => {

var option = args.slice(0).join(" ")
    if (!option) {
        var embed = new Discord.RichEmbed()
        .setColor("#ec0000")
        .setDescription(lang.remind)
        .addField(lang.usage, `${prefix}globalchat set [#channel]
${prefix}globalchat disable [#channel]`)
        .setFooter(`GlobalChat module`, client.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(embed);
    } else {
    if (option.match("set")) {
        if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "418383699361529856")
          return message.reply(lang.user_nopermission);

        let channel = message.mentions.channels.first();
        if (!channel) return message.reply(lang.mentionchannel_noinput);
        let guild = message.guild;

        client.gateaway.set(guild.id, {
          channel: channel.id
        });
        return message.channel.send(`<:toggleOn:599576556544720957> | **${lang.enable}** ${lang.globalchat_channel} ${channel.toString()}`);
    }
    }
    if (option.match("disable")) {
      if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== '418383699361529856') return message.reply(lang.user_nopermission)
  
      let channel = message.mentions.channels.first()
      if(!channel) return message.reply(lang.mentionchannel_noinput)
      let guild = message.guild;
  
      client.gateaway.delete(guild.id, {
        channel:channel.id
      }) 
      return message.channel.send(`<:toggleOff:599576572898312202> | **${lang.disable}** ${lang.globalchat_channel} ${channel.toString()}`)
    }
}

exports.conf = {
    aliases: ['gc'],
    cooldown: "3"
  }
  exports.help = {
    name: "globalchat",
    description: "Set up GlobalChat",
    usage: `globalchat set [#channel]
globalchat disable [#channel`
  }