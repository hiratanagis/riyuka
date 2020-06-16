exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/prunejuice.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "prunejuice",
  description: 'Play Soundboard Prunejuice',
  usage: 'prunejuice'
}