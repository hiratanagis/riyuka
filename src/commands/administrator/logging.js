const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, color, prefix, lang) => {

var option = args.slice(0).join(" ")
    if (!option) {
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(lang.remind)
        .addField(lang.usage, `${prefix}logging set [#channel]
${prefix}logging enable
${prefix}logging disable`)
        .setFooter(`Logging module`, client.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send({embed});
    } else {
    if (option.match("set")) {
        var channel = JSON.parse(fs.readFileSync("./src/database/logging.json", "utf8"))
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var inputmessage = message.mentions.channels.first()
        if (!inputmessage) return message.channel.send(lang.mentionchannel_noinput);
        if (args[0]) {
            channel[message.guild.id] = {
                channel: inputmessage.id
            };
            fs.writeFile("./src/database/logging.json", JSON.stringify(channel, null, 2), (err) => {
                if (err) console.log(err)
            });
            message.channel.send(lang.logging_channelset + inputmessage);
        }
    }
    }
    if (option.match("enable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var check = JSON.parse(fs.readFileSync("./src/database/logonoff.json", "utf8"));
        
        check[message.guild.id] = {
            checker: 1
        };
        fs.writeFile("./src/database/logonoff.json", JSON.stringify(check, null, 2), (err) => {
            console.error(err)
          message.channel.send(lang.logging_set + lang.enable);
        })
    };
    if (option.match("disable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var check = JSON.parse(fs.readFileSync("./src/database/logonoff.json", "utf8"));
        
        check[message.guild.id] = {
            checker: 0
        };
        fs.writeFile("./src/database/goodbyeonoff.json", JSON.stringify(check, null, 2), (err) => {
            console.error(err)
          message.channel.send(lang.logging_set + lang.disable);
        })
    }
}

exports.conf = {
  aliases: ['log', 'logchannel', 'modlog'], 
  cooldown: '5'
} 
exports.help = {
  name: 'logging',
  description: 'Set up Log message', 
  usage: `logging set [#channel]
logging enable
logging disable`
} 