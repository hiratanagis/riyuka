const Discord = require('discord.js');

module.exports = async (client, guild) => {
  let channel = client.channels.get("555941075307724802");

  
  try {
  const invite = await guild.channels.find(c => c.type !== "category" && c.position === 0).createInvite({
        maxAge: 0
  });
//  guild.fetchInvites()
//    .then(invites => {
//  let link = invites.map(invite => invite.code).join('\nhttps://discord.gg/');
  

  let join = new Discord.RichEmbed()
  .setColor("#00ddff")
  .setThumbnail(guild.iconURL)
  .setAuthor(client.user.username + " Join server")
  .addField("Server", `Name: ${guild.name}\nID: ${guild.id}`)
  .addField("Owner", `Name: ${guild.owner.user} | ${guild.owner.user.tag}\nID: ${guild.owner.user.id}`)
  .addField("Link", invite.url || "No Invite Link")
  .setFooter(client.user.username) .setTimestamp()
  
  channel.send(join);
  } catch(e) {
    let join = new Discord.RichEmbed()
  .setColor("#00ddff")
  .setThumbnail(guild.iconURL)
  .setAuthor(client.user.username + " Join server")
  .addField("Server", `Name: ${guild.name}\nID: ${guild.id}`)
  .addField("Owner", `Name: ${guild.owner.user} | ${guild.owner.user.tag}\nID: ${guild.owner.user.id}`)
  .addField("Link", "No Invite Link")
  .setFooter(client.user.username) .setTimestamp()
    channel.send(join)
  }
  
  
//  })
}
