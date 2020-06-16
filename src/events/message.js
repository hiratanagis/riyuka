const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const { embed_color } = require("../config.json");
const fs = require("fs");
const timeoutxp = new Set();
let xp = require("../../src/database/xp.json");
const db = require("quick.db");

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  let argss = message.content.trim().split(/ +/g);

  let gateaway = client.gateaway.get(message.guild.id);
  if (gateaway && message.channel.id === gateaway.channel) {
    require("../../src/handle/gateaway.js")(client, message);
  }

  let aiChannel = await db.fetch(`ai.${message.guild.id}`);

  let prefixes = JSON.parse(
    fs.readFileSync("./src/database/prefixes.json", "utf8")
  );
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: config.bot_prefix
    };
  }
  // - - - - - - - - - - -
  // if (message.author.bot || !message.guild) return;
  let prefix = prefixes[message.guild.id].prefixes;

  let prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  prefixMention = prefix;
  let msg = message.content.toLowerCase();

  if (
    msg.startsWith(prefix) ||
    msg.startsWith(`${client.user.toString()} `) ||
    msg.startsWith(`k `)
  )
    return require("../handle/command")(client, message);
  if (message.channel.id === aiChannel)
    return require("../handle/aiChat")(client, message);
 if (gateaway && message.channel.id === gateaway.channel) {
    require("../../src/handle/gateaway.js")(client, message);
  }

  if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
    message.channel.send(
      `<a:wave:572411874600288281> | Hi **${message.author.username}**, my prefix in this server is \`${prefix}\``
    );
  }
  const args = message.content
    .slice(prefix)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  let AFKdata = JSON.parse(fs.readFileSync("./src/database/afk.json", "utf8"));

  if (message.author.id in AFKdata && command !== "afk") {
    delete AFKdata[message.author.id];
    fs.writeFile("./src/database/afk.json", JSON.stringify(AFKdata), err => {
      if (err) console.log(err);
    });

    message.channel.send(
      `⌨️ | Welcome back ${message.author.toString()} I have been removing you from the list Afk`
    );
  }

  var AFKcheck = user => {
    return user.id in AFKdata;
  };

  const AFKandMentioned = message.mentions.users.filter(AFKcheck);

  if (AFKandMentioned.size) {
    var reason = AFKandMentioned.map(user => {
      return AFKdata[user.id];
    });
    let embed = new Discord.RichEmbed();
    embed.setColor(embed_color);
    embed.setAuthor(`He is AFK, please try again later!`);
    embed.addField("⌨ | Reason:", `${reason}` || "No Reason");
    message.channel.send(`${message.author.toString()}`, { embed });
  }
  /*
  //leveling
  let xpAdd = Math.floor(Math.random() * 2) + 2; 
   if (timeoutxp.has(message.author.id)) return;
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    if ('439866052684283905' !== message.guild.id && '387812458661937152' !== message.guild.id && '521975831740809227' !== message.guild.id && '343572980351107077' !== message.guild.id && '450100127256936458' !== message.guild.id && '264445053596991498' !== message.guild.id && '454933217666007052' !== message.guild.id && '374071874222686211' !== message.guild.id && '110373943822540800' !== message.guild.id && '447469952044105728' !== message.guild.id && '527862771014959134' !== message.guild.id) message.channel.send(`\🆙 | ${message.author} You've leveled up to **\`${curlvl + 1}\`**`).then(m => m.delete(7000));
  }
  
  fs.writeFile("./src/database/xp.json", JSON.stringify(xp), (err) => {
    if (err) console.log(err)
  });
  timeoutxp.add(message.author.id);
setTimeout(() => timeoutxp.delete(message.author.id), 60000);
*/
};
