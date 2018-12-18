const express = require('express');
const twit = require('twit');
const config = require('./config.js');
const retweet = require('./api/retweet.js');
const favoriteTweet = require('./api/favoriteTweet.js');
const app = express();
const http = require('http');

const Twitter = new twit(config);

retweet();
setInterval(retweet, 60000 * 60);

favoriteTweet();
setInterval(favoriteTweet, 60000 * 60);

app.listen(process.env.PORT || 5000, function () {
  console.log('Florida Music Bot is listening on port 5000');
})

setInterval(() => {
  http.get("http://florida-music-bot.herokuapp.com");
}, 180000);
