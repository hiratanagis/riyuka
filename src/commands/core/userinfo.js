const Discord = require("discord.js");
const ColorMap = {
    'online' : '#00FF00',
    'idle' : '#FF8000',
    'streaming' : '#A901DB',
    'dnd' : '#FF0000',
    'offline' : '#848484'
};
const ngebot = {
    'true' : 'Bot',
    'false' : 'User'
};
const StatusMap = {
    'online' : `<a:Online:572354796149932042>`,
    'idle' : `<a:Idle:572354849455341571>`,
    'streaming' : `<a:Streaming:572354921849159690>`,
    'offline' : `<a:Offline:572354895852732428>`,
    'dnd' : `<a:Dnd:572354871496278016>`
};
const StatusText = {
    'online' : 'Online',
    'idle' : 'Idle',
    'dnd' : 'Do Not Disturb',
    'offline' : 'Offline',
    'streaming' : 'Streaming'
};

exports.run = async(client, message, args, color, prefix, lang) => {
  
        let user;
    if (message.mentions.users.first() || client.users.get(args[0])) {
      user = message.mentions.users.first() || client.users.get(args[0]);
  
    } else {
        user = message.author;
    }
    var game;
	if (!user.presence.game) {
		game = 'No Game';
	} else {
		game = user.presence.game.name;
	}
    var member = message.guild.member(user) 
    let embed = new Discord.RichEmbed()
    .setDescription("🎟 Information: ")
    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .setThumbnail(user.displayAvatarURL)
    .addField('🔖 Username', user.username, true)
    .addField('💳 ID', user.id, true)
    .addField('🎫 Nickname', `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
    
    
    .addField('💡 Status', StatusMap[user.presence.status]+' '+StatusText[user.presence.status], true)
    .addField('💻 Persence Status', game, true)
    .addField('✏ Member Type', ngebot[user.bot], true)
    .addField(`✅ ${lang.create_at}`, new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
    .addField('📜 Joined at', new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
    .addField(`🏷 Roles`, `${message.guild.members.get(user.id).roles.filter(r => r.position !== 0).map(R => R).join(', ') || 'No Roles'}`)
    .setColor(ColorMap[user.presence.status])
    .setThumbnail(user.displayAvatarURL)
    message.channel.send(embed);

}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "userinfo",
    description: "Show User Info",
    usage: "userinfo",
  example: 'userinfo [@mention]'
}