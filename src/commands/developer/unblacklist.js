const Discord = require("discord.js");
const fs = require("fs");
const { owners_id } = require('../../config.json');
let blacklist = require("../../database/blacklist.json");

exports.run = async (client, message, args, color) => {  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
  const bl = client.channels.get("533801561776717844");
  const blk = client.channel.get("578897807377956864")
  let pUser = message.mentions.users.first() || client.users.get(args[0]);
  
  if (!pUser) return args.missing(message, 'Baka!!! Mention the user or give me the ID to unblacklisted.', client.commands.get('unblacklist').help);
  
    blacklist[pUser.id] = {
    checker: 0
  };
  
  pUser.send(`You\'ve been **unblacklist** from using **${client.user.username}**`)
  blk.send(`**${pUser.username}** \`${pUser.id}\` has been unblacklist.`)
  bl.send(`**${pUser.username}** \`${pUser.id}\` has been unblacklist.`)
  message.channel.send(`**${pUser.username}** \`${pUser.id}\` has been unblacklist.`);
  
  fs.writeFile("./src/database/blacklist.json", JSON.stringify(blacklist, null, 2), (err) => {
    if(err) console.log(err)
  });
 });
}

exports.conf = {
    aliases: ["wl"]
}

exports.help = {
    name: 'unblacklist',
    description: 'To unblacklist someone from using KuuHaku',
    usage: 'unblacklist <@Mention | ID>'
   } 