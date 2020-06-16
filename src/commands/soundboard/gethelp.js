exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/gethelp.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "gethelp",
  description: 'Play Soundboard Gethelp',
  usage: 'gethelp'
}