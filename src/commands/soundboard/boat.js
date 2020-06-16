exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/boat.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "boat",
  description: 'Play Soundboard Boat',
  usage: 'boat'
}