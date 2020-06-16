exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/bruh.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "bruh",
  description: 'Play Soundboard Bruh',
  usage: 'bruh'
}