exports.run = async (client, message) => { // eslint-disable-line no-unused-vars
  client.playSound("./src/assets/audio/oof.opus", message);
};
exports.conf = {
  aliases: [],
  cooldown: "5"
}
exports.help = {
  name: "oof",
  description: 'Play Soundboard Oof',
  usage: 'off'
}