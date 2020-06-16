const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {

var option = args.slice(0).join(" ")
    if (!option) {
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(lang.remind)
        .addField(lang.usage, `${prefix}goodbye edit [new message]
${prefix}goodbye enable
${prefix}goodbye disable
${prefix}goodbye set [#channel]
        
**${lang.available_tag}**
{user} - mention the user.
{username} - show the username.
{server} - tells the server name.
{membercount} - show the member count of the server.

**Example:**
{user} leaved. This server is now {membercount} member.`)
        .setFooter(`Goodbye module`, client.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send({embed});
    } else {
    if (option.match("set")) {
        var nick = JSON.parse(fs.readFileSync("./src/database/goodbye.json", "utf8"))
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var inputmessage = message.mentions.channels.first()
        if (!inputmessage) return message.channel.send(lang.mentionchannel_noinput);
        if (args[0]) {
            nick[message.guild.id] = {
                nick: inputmessage.id
            };
            fs.writeFile("./src/database/goodbye.json", JSON.stringify(nick), (err) => {
                if (err) console.log(err)
            });
            message.channel.send(lang.goodbye_channelset + inputmessage);
        }
    }
    }
    if (option.match("edit")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        if (!args.slice(1).join(" ")) return message.channel.send(lang.goodbye_messagenoinput)
        try {
            db.set(`goodbye_${message.guild.id}`, args.slice(1).join(" "))
            message.channel.send(`${lang.goodbye_messageset}\n\`\`\`${args.slice(1).join(" ")}\`\`\``)
        } catch (e) {
            message.channel.send('error')
        }
    }
    if (option.match("enable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/goodbyeonoff.json", "utf8"));
        
        welcomesetting[message.guild.id] = {
            checker: 1
        };
        fs.writeFile("./src/database/goodbyeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
        message.channel.send(`**Goodbye** ${lang.module} **${lang.enable}**`);
        
    }
    if (option.match("disable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/goodbyeonoff.json", "utf8"));
        
        welcomesetting[message.guild.id] = {
            checker: 0
        };
        fs.writeFile("./src/database/goodbyeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
        message.channel.send(`**Goodbye** ${lang.module} **${lang.disable}**`);
        
    }
}

exports.conf = {
    aliases: [],
    cooldown: "5"
  }
  exports.help = {
    name: "goodbye",
    description: "Set up Goodbye message",
    usage: `goodbye edit [new message]
goodbye enable
goodbye disable
goodbye set [#channel]
        
**Availables tags:**
{user} - mention the user.
{username} - show the username.
{server} - tells the server name.
{membercount} - show the member count of the server.

**Example:**
{user} leaved. This server is now {membercount} member.`
  }