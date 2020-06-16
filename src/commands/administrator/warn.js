const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db')

module.exports.run = async (client, message, args, color, prefix, lang) => {

  message.delete()
  if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== '418383699361529856') return message.reply(lang.user_nopermission);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply(lang.mention_noinput);
  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply(lang.bot_nopermission);
  let reason = args.join(" ").slice(22);

  let warns = await db.fetch(`warns_${wUser.id}`)
  if(!warns) warns = 1;

  let warnEmbed = new Discord.RichEmbed()
  .setDescription(lang.warn_log)
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .addField(lang.user_warned, `<@${wUser.id}>`)
  .addField(lang.warning_to, warns)
  .addField(lang.reason, reason);

  var warnchannel = JSON.parse(fs.readFileSync("./src/database/welcome.json", "utf8"))
    if (!warnchannel) return;
    let channelwarn = client.guild.channels.get(`${warnchannel[message.guild.id].channel}`);
    if (!channelwarn) return;
    channelwarn.send(warnEmbed);

  message.channel.send(`${wUser} ${lang.warn_succes} ${message.author}, ${lang.reason}: [ ${reason} ], ${lang.warning_to}: [ ${warns} ]`);
  db.add(`warns_${wUser.id}`, 1)

  

  if(warns == 2){
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!muterole) {
      try {
          muterole = await message.guild.createRole({
              name: 'Muted',
              color: '#000000',
              permission: []
          });
          message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTION: false,
              CONNECT: false
              });
          });
      } catch(e) {
          console.log(e.message);
      }
  };

    let mutetime = "5m";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> ${lang.mute_temporary}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> ${lang.member_succesmute}`)
    }, ms(mutetime))
  }
  if(warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> ${lang.user_banned}`)
  }

}

exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "warn",
  description: "Warn someone",
  usage: "warn [@mention] [reason]"
}