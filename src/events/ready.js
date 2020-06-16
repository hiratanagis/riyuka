const Discord = require("discord.js");
const hook = new Discord.WebhookClient("665454428924411905", "Dh2uKV_ylQ8McZruE4TFABHtxZeQgmxo14P4O07YnGTYjF0wI0IYjScNZEA42ht_Feol");
const client = new Discord.Client();

module.exports = async client => {
  function randStatus() {
    let status = [
      `Version 0.0.2 Alpha`,
      `The Bot Still Under Development`,
      `Stay Safe and Clean`,
 //     `${client.users.size} 👥 Users`,
 //     `${client.guilds.size} 📡 Servers`,
      `GlobalChat is Available for Testing`
   //   `at ${moment().tz("Asia/Makassar").format('LT')} WITA`,
    //  `at ${moment().tz("Asia/Jakarta").format('LT')} WIB`,
     // `at ${moment().tz("Asia/Jayapura").format('LT')} WIT`
    ];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], {
          type: "PLAYING"
    });
    
  };
client.user.setStatus("online")
setInterval(randStatus, 20000);
  console.log(`${client.user.username} sukses online!`);
  let embed = new Discord.RichEmbed()
  
  .setColor("#00ff15")
  .setAuthor(`Shard ${client.shard.id+1}/${client.shard.count}`)
  .addField('Status :', '✅ Ready')
  .setTimestamp()
  hook.send(embed)

}