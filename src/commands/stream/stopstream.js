const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix, lang) => {
  if (message.channel.type === "dm") return;
  const serverQueue = client.queue.get(message.guild.id);
  const streaming = client.stream.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send(lang.music_voicechannelnojoin);
  if (serverQueue)
    return message.channel.send(lang.stream_cantplay.replace('%stop', `\`${prefix}stop\``));
  if (!streaming)
    return message.channel.send(lang.stream_noplay);

  client.stream.delete(message.guild.id);
  message.member.voiceChannel.leave();

  message.channel.send(lang.stream_stop);
};
exports.conf = {
  aliases: ["ss", "ststream"],
  cooldown: ""
};

exports.help = {
  name: "stopstream",
  description: "To stop Streaming",
  usage: "stopstream",
  example: 'stopstream'
};
