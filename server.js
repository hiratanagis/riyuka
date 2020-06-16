const express = require('express');
const http = require('http');
const app = express();
// 5 Minute Ping Times
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://riyu.glitch.me`);
}, 280000);

module.exports = require('./src/main.js');