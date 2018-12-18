const config = require('../config.js');
const twit = require('twit');
const Twitter = new twit(config);
const ranDom = require('./random.js');


const retweet = function retweet () {
  const params = {
    q: '%23FloridaHipHop OR %40floridacomeup OR %235MMA OR %23floridarap OR %23mieuxfl OR %40MIEUX_FL OR %40CitrusRap OR mieuxfl:media OR CitrusRap:media OR %40FloridaMusicBot',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, (err, data, response) => {
    let tweets = data.statuses;
    let randomTweet = ranDom(tweets);

    if (typeof randomTweet !== 'undefined') {
      Twitter.post('statuses/retweet/:id', {
        id: randomTweet.id_str
      }, function (err,response) {
        if (response) {
          if (response.errors === undefined) {
            console.log('Retweeted!');
          } else {
            console.log('Something went wrong: ');
          }
        }

        if (err !== undefined) {
          console.log(err.message);
        }
      });
    } else {
      console.log('Something went wrong while searching for tweet');
    }
  })
}

module.exports = retweet;
