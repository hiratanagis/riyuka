const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch')

module.exports = async (member, client, message, args) => {
  
  async function createCanvas() {
  var namam = client.user.username
  var jadim = namam.length > 15 ? namam.substring(0, 13) + "..." : namam;
  var imageUrlRegex = /\?size=2048$/g;
              
  var {body: background} = await get("https://cdn.discordapp.com/attachments/533806235321892864/581433107882967050/1558694629138.png")
  var {body: background2} =await get("https://cdn.discordapp.com/attachments/533806235321892864/672404913501896716/20233_2.jpg")
  var {body: avatar} = await get(client.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"))

  return new Canvas(1280, 561)
  .addImage(background2, 0, 0, 1280, 561)
  .addBeveledImage(background, 0,0,1280,561)
  .setColor('#ffffff')
  .setTextAlign('center')
  .setTextFont('70px NotoEmoji')
  .addText('___________________________________', 640,515)
  .setTextAlign('left')
  .setTextFont('bold 80px Arial')
  .addText(`${jadim}`, 440, 305)
  .addText(`#${client.user.discriminator}`, 440, 375)
  .setTextFont('55px Arial')
  .addText(`THIS SERVER NOW HAS ${client.guild.memberCount} MEMBER`, 20, 500)
  .addRoundImage(avatar, 58, 60, 340, 340, 340/2)
  .toBufferAsync();
}
  
  var goodbye = JSON.parse(fs.readFileSync("./src/database/goodbye.json", "utf8"))
  let goodbyesetting = JSON.parse(fs.readFileSync("./src/database/goodbyeonoff.json", "utf8"));
  if (!goodbyesetting[client.guild.id]) {
    goodbyesetting[client.guild.id] = {
      checker: 1
    };
  }
  if(!goodbye[client.guild.id]) return;  
  let values = goodbyesetting[client.guild.id].checker

  if (values === undefined) return;
  if (values === 0) return;
  if (values === 1) {
    var goodbye = JSON.parse(fs.readFileSync("./src/database/goodbye.json", "utf8"))
    if (!goodbye) return;
    let channel = client.guild.channels.get(`${goodbye[client.guild.id].nick}`);
    if (!channel) return;

    let stri = await db.fetch(`goodbye_${client.guild.id}`);
    let string;
    if (stri) {
      string = await db.fetch(`goodbye_${client.guild.id}`);
    } else if (!stri) {
      string = `Goodbye **{username}** from {server}. See you again :cry:, We are now have {membercount} members.`;
    }
string = string.replace('{user}', client) // For replace the author tag
string = string.replace('{username}', client.user.username)
string = string.replace('{server}', client.guild.name) // For replace the server name
string = string.replace('{membercount}', client.guild.memberCount) // For replace the member count server
    
    channel.send(string)+channel.send(new Discord.Attachment(await createCanvas(), 'Goodbye.png'))
}
}