const { Canvas } = require('canvas-constructor');
const Discord = require('discord.js');
const { get } = require('node-superfetch');
const db = require('quick.db');

let lepel = require('../../database/xp.json');
let reps = require('../../database/rep.json');
let info = require('../../database/note.json');
let bg = require('../../database/background.json');

Canvas.registerFont(`${process.cwd()}/src/assets/font/NotoEmoji-Regular.ttf`, "NotoEmoji") 
Canvas.registerFont(`${process.cwd()}/src/assets/font/Roboto-Regular.ttf`, "RobotoRegular") 

exports.run = async (client, message, args, color, prefix, lang) => {
	
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(lang.profile_bot);
  
  const marry = await db.fetch(`marry_${user.id}`);
  const balance = await db.fetch(`userBalance_${user.id}`)
  let pickaxes = await db.fetch(`pickaxe_${user.id}`)
  let swords = await db.fetch(`sword_${user.id}`)
  /**
  * Define this all for fix undefined from JSON
  */
  if(!lepel[user.id]){
    lepel[user.id] = {
      xp: 0,
      level: 1
    };
  }
  
  if(!bg[user.id]){
    bg[user.id] = {
      background: 'https://cdn.discordapp.com/attachments/517214088896446466/529803566412595237/20190102_072921.jpg' 
    };
  }
  
  if(!reps[user.id]){
    reps[user.id] = {
      rep: 0
    };
  }
  if(!info[user.id]){
    info[user.id] = {
      note: 'No info set'
    } 
 } 
 
 /**
 * Takes all from JSON before call it
 */
  let xp = lepel[user.id].xp;
  let uLevel = lepel[user.id].level;
  let nxtLvlXp = uLevel * 500;
  let difference = xp/nxtLvlXp *150;
  
  let rep = reps[user.id].rep;
  let Info = info[user.id].note
  let background = bg[user.id].background;
  
  let pickaxe; // wait
  if (pickaxes == 'iron') {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/569305444749934592/542271493417992223.png' //:v
  } else if (pickaxes == 'gold') {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/571178534538575873/1556249928473.png' //:v
  } else if (pickaxes == 'diamond') {
     pickaxe = `https://cdn.discordapp.com/attachments/565103449390448656/569305478270681088/542271517006757889.png` 
  } else if (pickaxes == 'emerald') {
     pickaxe = `https://cdn.discordapp.com/attachments/565103449390448656/571178855709278219/1556250038942.png`
  } else {
     pickaxe = 'https://cdn.discordapp.com/attachments/565103449390448656/569305413003247686/542271456537477120.png';
  }
  
  let sword; // wait
  if (swords == 'iron') {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/569309206751084564/Iron_Sword.png' //:v
  } else if (swords == 'gold') {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/571178550518874113/unnamed.png' //:v
  } else if (swords == 'diamond') {
     sword = `https://cdn.discordapp.com/attachments/565103449390448656/569309151528878080/image.png` 
  } else if (swords == 'emerald') {
     sword = `https://cdn.discordapp.com/attachments/565103449390448656/569309850379616256/unnamed.png`
  } else {
     sword = 'https://cdn.discordapp.com/attachments/565103449390448656/569309304696340500/Wooden_Sword.png';
  }
  /**
  * Create Canvas function
  * Use try and catch for any error will caused
  */
    try {    
  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = user.username;
    var jadim = namam.length > 12 ? namam.substring(0, 15) + "..." : namam;
    var {body: avatar} = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size128"));
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/533806235321892864/556068843902992384/20190315_185832.png');
    var {body: dIcon} = await get('http://pngimg.com/uploads/love/love_PNG8.png')
    var {body: Pickaxe} = await get(pickaxe);
    var {body: Swordss} = await get(sword);
    const lines = client.util.getWrapText(info, 17);

  return new Canvas(600, 400)
    .setColor('#ffffff')
    .addImage(background1, 0,0,600,400)
    .addBeveledImage(background2, 0,0,600,400)
    .addImage(dIcon, 245,227,25,25)
    .addImage(Pickaxe, 265, 267, 30, 30)
    .addImage(Swordss, 315, 267, 30,30)
    .setTextFont('bold 25px Courier New') 
    .addText(`${jadim}`, 270, 210)
    .setTextFont('18px Arial')
    .setColor("#000000")
    .addText(`Married with ${marry ?  `${marry}` : 'Nobody'}`, 276, 245)
    .setTextFont('13px NotoEmoji')
    .addText(`${Info}`, 270, 325)
    .setTextAlign('right')
    .setTextFont('25px RobotoRegular')
    .addText(`${client.util.crFormat(xp)}`, 236, 326)
    .addText(`¥${balance ?  `${balance}` : '0'}`, 236, 276)
    .setColor("#000000")
    .setTextAlign('center')
    .setTextFont('bold 40px Courier New')
    .addText(`${uLevel}`, 559,65)
    .setColor("#ffffff")
    .setTextFont('bold 30px Courier New') 
    .addText(`${rep}`, 42,75) 
    .setColor("#00ff4c")
    .addRect(84, 360, difference, 12)
    .addRoundImage(avatar, 91, 94, 137, 137, 137/2)
    .toBufferAsync();
  }
  
  let m = await message.channel.send(lang.please_wait);
 
  const gumen = `
**User profile card for ${user.tag}**
`; message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'profile.png')}).then(() => {m.delete()})

  } catch (e) {
    message.channel.send(lang.error);
  } 
  

}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "profile",
    description: "See your/someone profile",
    usage: "profile [@mention|userID]",
  example: 'profile [@mention / User ID]'
}