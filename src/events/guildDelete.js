const Discord = require('discord.js');

module.exports = async (client, guild) => {
  let channel = client.channels.get("555941075307724802");
  
  let leave = new Discord.RichEmbed()
  .setColor("#ff1900")
  .setThumbnail(guild.iconURL)
  .setAuthor(client.user.username + " Left server")
  .addField("Server", `Name: ${guild.name}\nID: ${guild.id}`)
  .addField("Owner", `Name: ${guild.owner.user} | ${guild.owner.user.tag}\nID: ${guild.owner.user.id}`)
  .setFooter(client.user.username) .setTimestamp()
  
  channel.send(leave);
}