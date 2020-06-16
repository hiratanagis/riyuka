exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/boi.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "boi",
  description: 'Play Soundboard Boi',
  usage: 'boi'
}