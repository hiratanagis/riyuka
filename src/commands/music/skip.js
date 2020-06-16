exports.run = async (client, msg, args, color, prefix, lang) => {
    try{
        const serverQueue = client.queue.get(msg.guild.id);
      const streaming = client.stream.get(msg.guild.id)
    if (streaming) return msg.channel.send(lang.music_cantplay.replace('%stopstream', `\`${prefix}stopstream\``))
        if (!msg.member.voiceChannel) return msg.channel.send(lang.music_voicechannelnojoin);
      if(!serverQueue) return msg.channel.send(lang.music_noplay);
        if(serverQueue.voiceChannel.id !== msg.member.voiceChannel.id) return msg.channel.send(lang.music_voicechannelskip.replace('%voicechannel', `\`${serverQueue.voiceChannel.name}\``));
        
        const members = serverQueue.voiceChannel.members.filter(x => !x.user.bot);
        if(serverQueue.songs[0].meminta.id !== msg.author.id && members.size > 2){
            if(serverQueue.songs[0].votes.includes(msg.author.id)) return msg.channel.send(lang.music_skipvotesucces);
            serverQueue.songs[0].votes.push(msg.author.id);
            if(serverQueue.songs[0].votes.length === 3){
                msg.channel.send(lang.music_skip);
                return serverQueue.connection.dispatcher.end();
            }
            return msg.channel.send({ embed : { color: 0xefe940, description: `${lang.music_skipmorevote} ${serverQueue.songs[0].votes.length} / 3`}});
        }
        msg.channel.send(lang.music_skip);
        return serverQueue.connection.dispatcher.end(); 
    
        }catch(e){
            return msg.channel.send(lang.error);
        }
    }
    
    exports.conf = {
        aliases: ['sk'],
        cooldown: 1
    }
    
    exports.help = {
        name: 'skip',
        description: 'Skip the current song',
        usage: 'skip',
      example : 'skip'
    }