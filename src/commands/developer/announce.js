const Discord = require("discord.js");
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args) => {
owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
  client.gateaway.all().forEach(db => {
    let channel = client.channels.get(JSON.parse(db.data).channel);
    var announce = args.join(" ");

    if (channel && channel.id !== message.channel.id) {
      channel.send(`**INFORMATION**
${announce}`);
    }
  });
})
}
exports.conf = {
    aliases: [],
    cooldown: ""
}

exports.help = {
    name: "announce",
    description: "Send Announcement to all channel globalchat",
    usage: "announce [message]"
}