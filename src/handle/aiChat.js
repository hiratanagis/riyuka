const Discord = require("discord.js");
const db = require('quick.db')

module.exports = async (client, message) => {
  let args = message.content.trim().split(/ +/g);
  let text = args.join(" ");
  let language = await db.fetch(`ailang.${message.guild.id}`)
  let aiChannel = await db.fetch(`ai.${message.guild.id}`)
  let channel = client.channels.get(aiChannel)
  
  if (language == 'indonesia') {
    var apiaiIndo = require('apiai')(process.env.API_INDO);
    var request = apiaiIndo.textRequest(text, {
      sessionId: '<any-unique-name>'
    });

    // Listen to a response from API.ai
    request.on('response', (response) => {
    let string = response.result.fulfillment.speech;
    string = string.replace('%nick%', message.author)
    string = string.replace('%online%', message.guild.members.filter(o => o.presence.status === 'online' || o.presence.status === 'idle' || o.presence.status === 'dnd').size)
      channel.send(string);
    });
    request.on('error', (error) => {
      channel.send("Oops! There is an error in our end")
    });
    request.end();
    
  } else {
    var apiaiEng = require('apiai')(process.env.API_ENG);
    var request = apiaiEng.textRequest(text, {
      sessionId: '<any-unique-name>'
    });

    // Listen to a response from API.ai
    request.on('response', (response) => {
    let string = response.result.fulfillment.speech;
    string = string.replace('%nick%', message.author)
    string = string.replace('%online%', message.guild.members.filter(o => o.presence.status === 'online' || o.presence.status === 'idle' || o.presence.status === 'dnd').size)
      channel.send(string);
    });
    request.on('error', (error) => {
      channel.send("Oops! There is an error in our end")
    });
    request.end();
  }
  
}