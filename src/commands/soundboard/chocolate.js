exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/chocolate.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "chocolate",
  description: 'Play Soundboard Chocolate',
  usage: 'chocolate'
}