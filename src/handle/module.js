const Discord = require('discord.js');
const fs = require('fs');

module.exports = client => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.helps = new Discord.Collection();

    fs.readdir('./src/commands/', (err, categories) => {
        if (err) console.log(err);
        console.log(`Menemukan total ${categories.length} kategori.`);
        categories.forEach(category => {
            let moduleConf = require(`../commands/${category}/module.json`);
            moduleConf.path = `./commands/${category}`;
            moduleConf.cmds = [];
            client.helps.set(category, moduleConf);
            if (!moduleConf) return;
            fs.readdir(`./src/commands/${category}`, (err, files) => {
                console.log(`Menemukan total ${files.length - 1} perintah dari ${category}.`)
                if (err) console.log(err);
                let commands = new Array();
                files.forEach(file => {
                    if (!file.endsWith('.js')) return;
                    let prop = require(`../commands/${category}/${file}`);
                    let cmdName = file.split('.')[0];
                    client.commands.set(prop.help.name, prop);
                    prop.conf.aliases.forEach(alias => {
                        client.aliases.set(alias, prop.help.name);
                    });
                    client.helps.get(category).cmds.push(prop.help.name)
                });
            });
        });
    });
    client.playSound = async (sound, message) => {
        const voiceChannel = message.member.voiceChannel;
		    if(!voiceChannel) return message.channel.send({ embed : { color: 0xff2626, description: '😡 | You are not in a Voice Channel!' }})
        const serverQueue = client.queue.get(message.guild.id);
		    if(serverQueue) return message.channel.send({ embed : { color: 0xffe926, description: '🚫 | Now is playing music! Please stop the music to play SoundBoard'}})
        if (voiceChannel) {
          if (!message.guild.me.permissions.has("CONNECT") || !message.member.voiceChannel.permissionsFor(message.guild.me).has("CONNECT")) return message.reply("I can't join this voice channel!");
          const voiceChannel = message.member.voiceChannel;
          message.channel.send({ embed : { color: 0x3a52f2, description: "Playing sound..."}});
          const connection = await voiceChannel.join();
          const dispatcher = connection.playStream(require("fs").createReadStream(sound), {
            type: "ogg/opus"
          });
          dispatcher.setVolume(50 / 100)
          dispatcher.on("error", () => {
            dispatcher.destroy();
            voiceChannel.leave();
            console.error;
          });
          dispatcher.on("end", () => {
            dispatcher.destroy();
            voiceChannel.leave();
          });
        } else {
          message.channel.send({ embed : { color: 0xc2d62f, description: "😡 | You are not in a Voice Channel!"}});
        }
    };
}