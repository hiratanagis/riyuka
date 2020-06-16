exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/macandcheese.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "macandcheese",
  description: 'Play Soundboard Macandcheese',
  usage: 'macandcheese'
}