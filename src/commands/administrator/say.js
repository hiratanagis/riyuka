exports.run = async (client, message, args, color, prefix, lang) => {
  message.delete()
  if (!message.member.hasPermission('MANAGE_MESSAGES') && message.author.id !== '418383699361529856') return message.channel.send(lang.user_nopermission);
  var botmessage = args.join(" ");
  if (!botmessage) {
    message.channel.send(lang.empty_message)
    return;
  }
  message.channel.send(botmessage);

}
exports.conf = {
  aliases: []
}

exports.help = {
  name: 'say',
  description: 'Send message with bot',
  usage: 'say [message]'
};