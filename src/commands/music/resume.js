exports.run = async (client, msg, args, color, prefix, lang) => {
  
    const serverQueue = client.queue.get(msg.guild.id)
    const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
        if (serverQueue && !serverQueue.playing) {
              serverQueue.playing = true;
              serverQueue.connection.dispatcher.resume();
              return msg.channel.send(lang.music_resume);
          }
          return msg.channel.send(lang.error);
  }
  
  
  exports.conf = {
      aliases: [],
    cooldown: '3'
  };
  
  exports.help = {
      name: 'resume',
      description: 'Resumed music',
      usage: 'resume',
    example: 'resume'
  };