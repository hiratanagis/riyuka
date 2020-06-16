exports.run = async (client, message, args, color, prefix, lang) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '418383699361529856') return message.reply(lang.user_nopermission);
    
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES") && message.author.id !== '418383699361529856') return message.channel.send(lang.bot_nopermission);
    if (isNaN(args[0])) return message.reply(lang.deletemessage_noinput);
    
    if (args[0] > 100) return message.reply(lang.deletemessage_over);
    const fetched = await message.channel.fetchMessages({limit: args[0]})
    .catch(error => message.reply(lang.deletemessage_over));
  
  
    message.channel.bulkDelete(fetched)
    .then(messages => message.channel.send(`\`${messages.size}/${args[0]}\` ${lang.deletemessage_succes}`).then(msg => msg.delete(5000)))
    .catch(error => message.channel.send(`<a:Silang:571969696954581006> ${lang.deletemessage_error}`))

  }
  
  exports.conf = {
      aliases: ['prune', 'purge'],
      cooldown: "5"
  }
  
  exports.help = {
      name: "clear",
      description: "Bulk delete (Up to 99)",
      usage: "clear [1-100]"
  }
  