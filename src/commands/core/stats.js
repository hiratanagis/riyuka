const { RichEmbed, version } = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args, color, prefix, lang) => {
//  let cmd = await db.fetch(`commandUsage`)
  let API = (client.ping).toFixed(2)
  const StatusText = {
    'online' : 'Online',
    'idle' : 'Idle',
    'dnd' : 'Do Not Disturb',
    'offline' : 'Offline',
    'streaming' : 'Streaming'
};
    let ms = client.uptime;
    let cd = 24 * 60 * 60 * 1000; // Calc days
    let ch = 60 * 60 * 1000; // Calc hours
    let cm = 60 * 1000; // Calc minutes
    let cs = 1000; // Calc seconds
    let days = Math.floor(ms / cd);
    let dms = days * cd; // Days, in ms
    let hours = Math.floor((ms - dms) / ch);
    let hms = hours * ch; // Hours, in ms
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm; // Minutes, in ms
    let seconds = Math.round((ms - dms - hms - mms) / cs);
    if (seconds === 60) {
        minutes++; // Increase by 1
        seconds = 0;
    }
    if (minutes === 60) {
        hours++; // Inc by 1
        minutes = 0;
    }
    if (hours === 24) {
        days++; // Increase by 1
        hours = 0;
    }
    let dateStrings = [];

    if (days === 1) {
        dateStrings.push('1 day');
    } else if (days > 1) {
        dateStrings.push(String(days) + ' days');
    }

    if (hours === 1) {
        dateStrings.push('1 hour');
    } else if (hours > 1) {
        dateStrings.push(String(hours) + ' hours');
    }

    if (minutes === 1) {
        dateStrings.push('1 minute');
    } else if (minutes > 1) {
        dateStrings.push(String(minutes) + ' minutes');
    }

    if (seconds === 1) {
        dateStrings.push('1 second');
    } else if (seconds > 1) {
        dateStrings.push(String(seconds) + ' seconds');
    }

    let dateString = '';
    for (let i = 0; i < dateStrings.length - 1; i++) {
        dateString += dateStrings[i];
        dateString += ', ';
    }
    if (dateStrings.length >= 2) {
        dateString = dateString.slice(0, dateString.length - 2) + dateString.slice(dateString.length - 1);
        dateString += ', ';
    }
    dateString += dateStrings[dateStrings.length - 1];
  
    const os = require('os');
    const arch = os.arch()
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
  
    let totalSeconds = process.uptime();
    var cpu = process.cpuUsage().system / 1024 / 1024;
    var cpu_usage = Math.round(cpu * 100) / 100;
    
    let postMsg = await message.channel.send(lang.please_wait);
    let info = new RichEmbed()
        .setColor(color)
        .setThumbnail(client.user.displayAvatarURL)
        .setAuthor(client.user.username + "'s Statistic Info",client.user.displayAvatarURL)
        .addField("🌍 Connected to", `\`\`\`• Ping: ${API}ms\n• Servers: ${client.guilds.size}\n• Channels: ${client.channels.size}\n• Users: ${client.users.size}\n• Total Commands: ${client.commands.size}\n• Shard: This guild is running on shards ${client.shard.id+1} of ${client.shard.count}\`\`\``)
        .addField("💾 Usage", `\`\`\`• Uptime: ${dateStrings}\n• Ram: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB\n• CPU Usage: ${cpu_usage}% Used\n• Connection: ${client.voiceConnections.size.toLocaleString()}\`\`\``)
        .addField("⚙ Engines", `\`\`\`• Node: ${process.version}\n• Library: discord.js v11.4.2\n• Platform: ${os.platform}\n• Arch: ${arch}\n• Processor: ${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)

        .setFooter(`${message.guild.name} | ${message.guild.owner.user.tag}`)

         setTimeout(() => {
         postMsg.edit(info)
          }, 1000);
} 

this.conf = {
	aliases: ['st'],
	cooldown: "10"
}

this.help = {
	name: 'stats',
	description: 'See Bot Stats',
	usage: 'stats',
  example: 'stats'
}
