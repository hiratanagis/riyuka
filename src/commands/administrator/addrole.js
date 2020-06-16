const ms = require("ms");
exports.run = async(client, message, args, color, prefix, lang) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    let member2 = message.mentions.members.first() || client.users.get(args[0]);
    if (!member2)
      return message.reply(lang.mention_noinput);

    let muteRole2 = message.mentions.roles.first();
    if (!muteRole2) return message.reply(lang.role_noinput);

    let time2 = args[2];
    if (!time2) {
      member2.addRole(muteRole2.id);
      message.channel.send(
        member2 + lang.role_givesucces + muteRole2.name
      );
    } else {
      member2.addRole(muteRole2.id);
      message.channel.send(
        member2 + lang.role_givesucces + muteRole2.name + ` for: ${ms(ms(time2), { long: true })}`
      );

      setTimeout(function() {
        member2.removeRole(muteRole2.id);
        message.channel.send(
          member2 + lang.temporaryrole_remove
        );
      }, ms(time2));
    }
  } else {
    return message.reply(
      lang.user_nopermission
    );
  }
};
exports.conf = {
  aliases: [],
  cooldown: "5"
};
exports.help = {
  name: "addrole",
  description: "Adding roles",
  usage: `addrole [@mention] <@role>
  addrole [@mention] <@role> <time[s/m/h/d]>`
};
