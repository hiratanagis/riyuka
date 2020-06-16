const Discord = require('discord.js');

exports.run = async (client, message, args, color, prefix, lang) => {
  message.delete()
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`❌ | **${message.author.username}**, ${lang.user_nopermission}`);

    var text = args.join(" ");
    if (!text) return message.channel.send(lang.empty_message);

    let postMsg = await message.channel.send(lang.please_wait);
    let embedsay = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${text}`);
        message.channel.send(embedsay).then(() => { postMsg.delete();});
};

exports.conf = {
    aliases: [],
    cooldown: '10'
};

exports.help = {
    name: "embed",
    description: "Send Embed",
    usage: "embed [text/message]"
};
