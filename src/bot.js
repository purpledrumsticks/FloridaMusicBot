let express = require('express');
let twit = require('twit');
let config = require('./config.js');
let app = express();
let http = require('http');

let Twitter = new twit(config);

const ranDom = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

//retweet a random tweet
const retweet = function () {
  let params = {
    q: '%40floridacomeup OR %23FloridaHipHop OR %235MMA OR %23floridarap OR %23mieuxfl OR %40MIEUX_FL OR %40CitrusRap OR mieuxfl:media',
    result_type: 'mixed OR recent OR popular',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function (err,data) {

    let tweet = data.statuses;
    let randomTweet = ranDom(tweet);

    if (typeof randomTweet !== 'undefined') {
      Twitter.post('statuses/retweet/:id', {
        id: randomTweet.id_str
      }, function (err,response) {
        if (response) {
          console.log('Retweeted!');
        }

        if (err) {
          console.log('Cannot be retweeted :( something went wrong');
        }
      });
    }
    else {
      console.log('Something went wrong while searching for tweet');
    }
  })
}

retweet();
setInterval(retweet, 60000 * 60);

//favorite a random tweet
const favoriteTweet = function () {

  let params = {
    q: '%23FloridaHipHop OR %40floridacomeup OR %23floridarap OR %235MMA OR %23mieuxfl OR %40MIEUX_FL OR %40CitrusRap OR mieuxfl:media',
    result_type: 'mixed OR recent OR popular',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function (err, data) {

    let tweet = data.statuses;
    let randomTweet = ranDom(tweet);

    if (typeof randomTweet !== 'undefined') {
      Twitter.post('favorites/create', {
        id: randomTweet.id_str
      }, function (err,response) {
        if (response) {
          console.log('Favorited!');
        }

        if (err) {
          console.log('Cannot be favorited :( something went wrong');
        }
      });
    }
    else {
      console.log('Something went wrong while searching for tweet');
    }
  })
}


favoriteTweet();
setInterval(favoriteTweet, 60000 * 60);

app.listen(process.env.PORT || 5000, function () {
  console.log('Florida Music Bot is listening on port 5000');
})

setInterval(() => {
  http.get("https://florida-music-bot.herokuapp.com");
}, 180000);
