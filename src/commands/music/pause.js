exports.run = async (client, msg, args, color, prefix, lang) => {
    const serverQueue = client.queue.get(msg.guild.id)  
    const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
    if (serverQueue && serverQueue.playing) {
                serverQueue.playing = false;
                serverQueue.connection.dispatcher.pause();
                return msg.channel.send(lang.music_paused);
            }
            return msg.channel.send(lang.music_noplay);
      }
    
    exports.conf = {
        aliases: [],
      cooldown: '3'
    };
    
    exports.help = {
        name: 'pause',
        description: 'Pauses the music',
        usage: 'pause',
      example:'pause'
    };