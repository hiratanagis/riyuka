const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db');

exports.run = async (client, message, args, color, prefix, lang) => {

var option = args.slice(0).join(" ")
    if (!option) {
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(lang.remind)
        .addField(lang.usage, `${prefix}welcome edit [new message]
${prefix}welcome enable
${prefix}welcome disable
${prefix}welcome set [#channel]
        
**Availables tags:**
{user} - mention the user.
{username} - show the username.
{server} - tells the server name.
{membercount} - show the member count of the server.

**Example:**
{user} joined. We are now {membercount} in the server.`)
        .setFooter(`Welcome module`, client.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(embed);
    } else {
    if (option.match("set")) {
        var nick = JSON.parse(fs.readFileSync("./src/database/welcome.json", "utf8"))
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var inputmessage = message.mentions.channels.first()
        if (!inputmessage) return message.channel.send(lang.mentionchannel_noinput);
        if (args[0]) {
            nick[message.guild.id] = {
                nick: inputmessage.id
            };
            fs.writeFile("./src/database/welcome.json", JSON.stringify(nick), (err) => {
                if (err) console.log(err)
            });
            message.channel.send(lang.welcome_channelset + inputmessage);
        }
    }
    }
    if (option.match("edit")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        if (!args.slice(1).join(" ")) return message.channel.send(lang.welcome_messagenoinput)
        try {
            db.set(`welcome_${message.guild.id}`, args.slice(1).join(" "))
            message.channel.send(`${lang.welcome_messageset}\n\`\`\`${args.slice(1).join(" ")}\`\`\``)
        } catch (e) {
            message.channel.send('error')
        }
    }
    if (option.match("enable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/welcomeonoff.json", "utf8"));
  //      let values = welcomesetting[message.guild.id].checker
        
        welcomesetting[message.guild.id] = {
            checker: 1
        };
        fs.writeFile("./src/database/welcomeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
  /*      if (values === 1) {
            message.channel.send({ embed : { color: 0xff2626, description: '**Welcome** module is enabled'}})
        } else {*/
        message.channel.send(`**Welcome** ${lang.module} **${lang.enable}**`);
   //     }
    }
    if (option.match("disable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/welcomeonoff.json", "utf8"));
   //     let values = welcomesetting[message.guild.id].checker
        
        welcomesetting[message.guild.id] = {
            checker: 0
        };
        fs.writeFile("./src/database/welcomeonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
   /*     if (values === 0) {
            message.channel.send({ embed : { color: 0xff2626, description: '**Welcome** module is disabled'}})
        } else {*/
        message.channel.send(`**Welcome** ${lang.module} **${lang.disable}**`);
    //    }
    }
}

exports.conf = {
    aliases: [],
    cooldown: "5"
  }
  exports.help = {
    name: "welcome",
    description: "Set up Welcome message",
    usage: `welcome edit [new message]
welcome enable
welcome disable
welcome set [#channel]
        
**Availables tags:**
{user} - mention the user.
{username} - show the username.
{server} - tells the server name.
{membercount} - show the member count of the server.

**Example:**
{user} joined. We are now {membercount} in the server.`
  }