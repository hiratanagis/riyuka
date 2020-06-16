exports.run = async (client, message, args, color, prefix, lang) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '418383699361529856') return message.reply(lang.user_nopermission);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES") && message.author.id !== '418383699361529856') return message.channel.send(lang.bot_nopermission);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(lang.mention_noinput);
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!member.roles.has(muterole.id)) return message.channel.send(`**${member.username}** ${lang.member_nomute}`);
    await (member.removeRole(muterole.id));
    message.channel.send(`<@${member.id}> :tada: ${lang.member_succesmute}`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute someone",
    usage: "unmute [@mention]"
}
