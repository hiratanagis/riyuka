exports.run = async (client, message, args, color, prefix, lang) => {

  if(message.member.hasPermission("ADMINISTRATOR")) {
    let member3 = message.mentions.members.first();
    if(!member3) return message.reply(lang.mention_noinput);
  
    let muteRole3 = message.mentions.roles.first();
    if(!muteRole3) return message.reply(lang.role_noinput);
  
    member3.removeRole(muteRole3.id);
    message.channel.send(member3 + lang.role_removesucces + muteRole3.name);
  
    }else {
      return message.reply(lang.user_nopermission)
    };
  }
  exports.conf = {
    aliases: [],
    cooldown: "5"
  }
  exports.help = {
    name: "removerole",
    description: "Removing roles",
    usage: "removerole [mention] <role>"
  }