const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db');
let bg = require('../../database/welcomebackground.json');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch')

exports.run = async (client, message, args, color, prefix, lang) => {

var option = args.slice(0).join(" ")
    if (!option) {
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(lang.remind)
        .addField(lang.usage, `${prefix}welcomeimg enable
${prefix}welcomeimg disable
${prefix}welcomeimg background [attachments]
${prefix}welcomeimg set [#channel]
${prefix}welcomeimg preview`)
        .setFooter(`Welcome Image module`, client.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(embed);
    } else {
    if (option.match("set")) {
        var nick = JSON.parse(fs.readFileSync("./src/database/welcomeimg.json", "utf8"))
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var inputmessage = message.mentions.channels.first()
        if (!inputmessage) return message.channel.send(lang.mentionchannel_noinput);
        if (args[0]) {
            nick[message.guild.id] = {
                nick: inputmessage.id
            };
            fs.writeFile("./src/database/welcomeimg.json", JSON.stringify(nick), (err) => {
                if (err) console.log(err)
            });
            message.channel.send(lang.welcomeimg_channelset + inputmessage);
        }
    }
    }
    if (option.match("background")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        if(!bg[message.guild.id]){
            bg[message.guild.id] = {
              background: 'https://cdn.discordapp.com/attachments/533806297011978240/581708600263573504/The_Verge_Wallpaper_01-18-19.0_2.png'
            };
        }

        let newBg = message.attachments.first();
        if(!newBg) return message.channel.send(lang.welcomeimg_imagenoinput);
          
        bg[message.guild.id].background = newBg.url;
          
        let h = await message.channel.send(`<a:Loading:572827174776733708> ${lang.please_wait}`);
          
        fs.writeFile('./src/database/welcomebackground.json', JSON.stringify(bg, null, 2), (err) => {
          
            message.channel.send(lang.welcomeimg_imageset)
        });
    }
    if (option.match("enable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/welcomeimgonoff.json", "utf8"));
  //      let values = welcomesetting[message.guild.id].checker
        
        welcomesetting[message.guild.id] = {
            checker: 1
        };
        fs.writeFile("./src/database/welcomeimgonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
  /*      if (values === 1) {
            message.channel.send({ embed : { color: 0xff2626, description: '**Welcome** module is enabled'}})
        } else {*/
        message.channel.send(`**Welcome Image** ${lang.module} **${lang.enable}**`);
   //     }
    }
    if (option.match("disable")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
        var welcomesetting = JSON.parse(fs.readFileSync("./src/database/welcomeimgonoff.json", "utf8"));
   //     let values = welcomesetting[message.guild.id].checker
        
        welcomesetting[message.guild.id] = {
            checker: 0
        };
        fs.writeFile("./src/database/welcomeimgonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
            console.error(err)
        })
   /*     if (values === 0) {
            message.channel.send({ embed : { color: 0xff2626, description: '**Welcome** module is disabled'}})
        } else {*/
        message.channel.send(`**Welcome Image** ${lang.module} **${lang.disable}**`);
    //    }
    }
    if (option.match("preview")) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply(lang.user_nopermission);
  if(!bg[message.guild.id]){
    bg[message.guild.id] = {
      background: 'https://cdn.discordapp.com/attachments/565103449390448656/672403026761351178/cute-anime-wallpaper-hd-desktop-1600x1000-animals-zoo-park-beautiful-anime-girls-wallpapers-for-desk.jpg' 
    };
  }
  
  let background = bg[message.guild.id].background;
  
  async function createCanvas() {
  var namam = message.author.username
  var jadim = namam.length > 15 ? namam.substring(0, 13) + "..." : namam;
  var imageUrlRegex = /\?size=2048$/g;
              
  var {body: background1} = await get("https://cdn.discordapp.com/attachments/533806235321892864/581433077025341440/1558694647639.png")
  var {body: background2} = await get(background)
  var {body: avatar} = await get(message.author.displayAvatarURL.replace(imageUrlRegex, "?size=128"))

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
  .addText(`#${message.author.discriminator}`, 440, 375)
  .setTextFont('55px Arial')
  .addText(`YOU ARE THE ${message.guild.memberCount} MEMBER`, 20, 500)
  .addRoundImage(avatar, 58, 60, 340, 340, 340/2)
  .toBufferAsync();
}
        message.channel.send(new Discord.Attachment(await createCanvas(), 'Welcome.png'));
    }
}

exports.conf = {
    aliases: [],
    cooldown: "5"
  }
  exports.help = {
    name: "welcomeimg",
    description: "Set up Welcome card",
    usage: `welcomeimg enable
welcomeimg disable
welcomeimg background [attachments]
welcomeimg set [#channel]
welcomeimg preview`
  }