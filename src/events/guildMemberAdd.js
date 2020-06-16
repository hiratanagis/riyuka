const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch')
let bg = require('../../src/database/welcomebackground.json');

module.exports = async (member, client, message, args) => {
  
  if(!bg[client.guild.id]){
    bg[client.guild.id] = {
      background: 'https://cdn.discordapp.com/attachments/565103449390448656/672403026761351178/cute-anime-wallpaper-hd-desktop-1600x1000-animals-zoo-park-beautiful-anime-girls-wallpapers-for-desk.jpg' 
    };
  }
  
  let background = bg[client.guild.id].background;
  
  async function createCanvas() {
  var namam = client.user.username
  var jadim = namam.length > 15 ? namam.substring(0, 13) + "..." : namam;
  var imageUrlRegex = /\?size=2048$/g;
              
  var {body: background1} = await get("https://cdn.discordapp.com/attachments/533806235321892864/581433077025341440/1558694647639.png")
  var {body: background2} = await get(background)
  var {body: avatar} = await get(client.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"))

  return new Canvas(1280, 561)
  .addImage(background2, 0, 0, 1280, 561)
  .addBeveledImage(background1, 0,0,1280,561)
  .setColor('#ffffff')
  .setTextAlign('center')
  .setTextFont('70px NotoEmoji')
  .addText('___________________________________', 640,515)
  .setTextAlign('left')
  .setTextFont('bold 80px Arial')
  .addText(`${jadim}`, 440, 305)
  .addText(`#${client.user.discriminator}`, 440, 375)
  .setTextFont('55px Arial')
  .addText(`YOU ARE THE ${client.guild.memberCount} MEMBER`, 20, 500)
  .addRoundImage(avatar, 58, 60, 340, 340, 340/2)
  .toBufferAsync();
}
  
  var welcome = JSON.parse(fs.readFileSync("./src/database/welcome.json", "utf8"))
  let welcomesetting = JSON.parse(fs.readFileSync("./src/database/welcomeonoff.json", "utf8"));
  if (!welcomesetting[client.guild.id]) {
    welcomesetting[client.guild.id] = {
      checker: 1
    };
  }
  if(!welcome[client.guild.id]) return;  
  let values = welcomesetting[client.guild.id].checker

  if (values === undefined) return;
  if (values === 0) return;
  if (values === 1) {
    var welcome = JSON.parse(fs.readFileSync("./src/database/welcome.json", "utf8"))
    if (!welcome) return;
    let channel = client.guild.channels.get(`${welcome[client.guild.id].nick}`);
    if (!channel) return;
    
    let stri = await db.fetch(`welcome_${client.guild.id}`);
    let string;
    if (stri) {
      string = await db.fetch(`welcome_${client.guild.id}`);
    } else if (!stri) {
      string = `Welcome **{username}** to {server}! You are the {membercount} member here!`;
    }
string = string.replace('{user}', client) // For replace the author tag
string = string.replace('{username}', client.user.username)
string = string.replace('{server}', client.guild.name) // For replace the server name
string = string.replace('{membercount}', client.guild.memberCount) // For replace the member count server
    
//    channel.send(string, {file: new Discord.Attachment(await createCanvas(), 'welcome.png')})

   channel.send(string)
  } 
  
//welcomw image module
    var welcomeimg = JSON.parse(fs.readFileSync("./src/database/welcomeimg.json", "utf8"))
  let welcomeimgsetting = JSON.parse(fs.readFileSync("./src/database/welcomeimgonoff.json", "utf8"));
  if (!welcomeimgsetting[client.guild.id]) {
    welcomeimgsetting[client.guild.id] = {
      checker: 1
    };
  }
  if(!welcomeimg[client.guild.id]) return;  
  let valuesimg = welcomeimgsetting[client.guild.id].checker

  if (valuesimg === undefined) return;
  if (valuesimg === 0) return;
  if (valuesimg === 1) {
    var welcomeimg = JSON.parse(fs.readFileSync("./src/database/welcomeimg.json", "utf8"))
    if (!welcomeimg) return;
    let channelimg = client.guild.channels.get(`${welcomeimg[client.guild.id].nick}`);
    if (!channelimg) return;

   channelimg.send(new Discord.Attachment(await createCanvas(), 'Welcome.png'))
  } 
}