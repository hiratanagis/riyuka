const { RichEmbed } = require("discord.js");

exports.run = async (client, msg, args, color, prefix, lang) => {
  try {
    const serverQueue = client.queue.get(msg.guild.id);
    const streaming = client.stream.get(msg.guild.id);
    if (serverQueue)
      return msg.channel.send(lang.stream_cantplay.replace('%stop', `\`${prefix}stop\``));

    if (!streaming) return msg.channel.send(lang.stream_noplay);
    const embed = new RichEmbed()
      .setColor(color)
      .setAuthor(
        `Now Streaming: ${streaming.stream}`,
        `https://cdn.discordapp.com/emojis/571969606609010690.gif?v=1`
      )
      //  .setThumbnail()
      .addField("📎 Link", `[Click here]()`, true)
      .addField("🔉 Volume", `${streaming.volume}%`, true)
      //  .addField("🕰 Duration", `${serverQueue.songs[0].durationh}h ${serverQueue.songs[0].durationm}m ${serverQueue.songs[0].durations}s`, true)
      .addField("🎧 Voice Channel", `${streaming.voiceChannel}`, true)
      .addField(
        "<:Verifikasi:571969782275112971> Requested by",
        `${streaming.request}`,
        true
      );

    return msg.channel.send(embed);
  } catch (e) {
    return msg.channel.send(
      lang.error
    );
  }
};

exports.conf = {
  aliases: ["ns", "nowstreaming"],
  cooldown: "3"
};

exports.help = {
  name: "nowstream",
  description: "Check now stream running",
  usage: "nowstream",
  example: 'nowstream'
};
