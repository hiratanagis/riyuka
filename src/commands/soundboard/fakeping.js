exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/ping.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "fakeping",
  description: 'Play Soundboard Fakeping',
  usage: 'fakeping'
}