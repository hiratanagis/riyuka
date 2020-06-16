const Discord = require('discord.js');
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args, color, prefix) => {
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
    try {
    if (!args[0]) return message.channel.send('Input the server ID')
    let guild = client.guilds.get(args[0])
    if (!guild) return message.channel.send("The bot isn't in the guild with this ID.");

    let invitechannels = guild.channels.filter(c=> c.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE'))
    if(!invitechannels) return message.channel.send('No Channels found with permissions to create Invite in!')
    const invite = await guild.channels.find(c => c.type !== "category" && c.position === 0).createInvite({
        maxAge: 0
    });
    
 /*   guild.fetchInvites()
      .then(invites => {
    let link = invites.map(invite => invite.code).join('\nhttps://discord.gg/');
    
    }) 
    invitechannels.random().createInvite()
     .then(invite=> message.channel.send(`Found Invite:\nhttps://discord.gg/${invite.code}`))*/
      message.channel.send(`Found Invite:\n${invite.url}`)
    } catch (e) {
      return message.channel.send(`\`[ERROR ❌]\`, ${e.message}`)
    }
  });
}

exports.conf = {
    aliases: [],
    cooldown: "3"
}

exports.help = {
    name: "backdoor",
    description: "Get server link",
    usage: "backdoor [server ID]"
}