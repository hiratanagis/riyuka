const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args, color, prefix, lang) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(lang.user_nopermission);
  if(!args[0] || args[0 == "help"]) return message.channel.send(lang.prefix_currentprefix + ` \`${prefix}\``);

  let prefixes = JSON.parse(fs.readFileSync("./src/database/prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./src/database/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  message.channel.send(lang.prefix_change.replace('%prefix', `**${args[0]}**`));
}

exports.conf = {
    aliases: ['setprefix'],
    cooldown: "5"
}

exports.help = {
    name: "prefix",
    description: "Change prefix",
    usage: "prefix [prefix baru]"
}