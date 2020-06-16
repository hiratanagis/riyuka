const Discord = require("discord.js");
const moment = require("moment");
let os = require('os');
let cpuStat = require("cpu-stat");

exports.run = async (client, message, args, color, prefix, lang) => {
  var cpu = process.cpuUsage().system / 1024 / 1024;
  var cpu_usage = Math.round(cpu * 100) / 100;
  let API = (client.ping).toFixed(2)
  let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
    }
        const duration = moment.duration(client.uptime).format(" D [day], H [hour], m [minute], s [second]");
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor(color)
    .setThumbnail(bicon)
    .setAuthor(client.user.username + ' ' + lang.information, bicon)
    .addField("Bot Info", `**Name:** ${client.user.username}\n**Tag:** ${client.user.tag}\n**Discrim:** ${client.user.discriminator}\n**ID:** ${client.user.id}\n**Prefix:** ${prefix}\n**Create At:** ${moment(client.user.createdAt).utcOffset('+0800').format("dddd, MMMM Do YYYY, HH:mm:ss")} WITA`)
    .addField(lang.other_info, `**Node:** ${process.version}\n**Library:** discord.js v11.4.2\n**Platform:** ${os.platform}\n**Arch:** ${os.arch()}\n**Processor:** ${os.cpus().map(i => `${i.model}`)[0]}`)

    .setFooter(`${message.guild.name} | ${message.guild.owner.user.tag}`);
    message.channel.send(botembed);
    });
    };
      
exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "botinfo",
    description: "See Bot Info",
    usage: "botinfo",
  example: 'botinfo'
}