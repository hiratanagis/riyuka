exports.run = async (client, message, args, color, prefix, lang) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '418383699361529856') return message.channel.send(lang.user_nopermission);
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES") && message.author.id !== '418383699361529856') return message.channel.send(lang.bot_nopermission);

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(lang.mention_noinput);
    
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

    if (member.roles.has(muterole.id)) return message.channel.send(`**${message.author.username}**, ${lang.mute_succes}`);
    await (member.addRole(muterole.id));
//    message.channel.send(`**${message.author.username}**, You muted <@${member.id}>.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "mute",
    description: "Mute someone",
    usage: "mute [@mention]"
}
