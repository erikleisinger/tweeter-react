const database = require('../database');

module.exports = function(router, database) {

  router.get('/tweeter', async (req, res) => {

    const likes = await database.getLikes()
    .then((data) => {
      return data
    })
    .catch(e => {
      console.error(e);
    }); 

    const retweets = await database.getRetweets()
    .then((data) => {
      return data
    })
    .catch(e => {
      console.error(e);
    }); 


    const tweets = await database.getTweets()
    .then((data) => {
      const allTweets = data.tweets.concat(data.retweets);
      let tweetsWithLikes = allTweets.reduce((acc, current) => {
        if (likes.some((like) => like.tweet_id === current.id)) {
          let likesData = likes.filter((like) => like.tweet_id === current.id)[0];
          const tweetWithLikes = {...current, 'likes': Number(likesData.likes)}
          return [...acc, tweetWithLikes]
        } else {
          return [...acc, current]
        }

      }, [])

      let tweetsWithLikesAndRetweets = tweetsWithLikes.reduce((acc, current) => {
        if (retweets.some((retweet) => retweet.tweet_id === current.id)) {
          let retweetsData = retweets.filter((retweet) => retweet.tweet_id === current.id)[0];
          const updatedTweet = {...current, 'retweets': Number(retweetsData.retweets)}
          return [...acc, updatedTweet]
        } else {
          return [...acc, current]
        }

      }, [])

      const tweetsData = {

      }

      res.send(tweetsWithLikesAndRetweets)
    })
    .catch(e => {
      console.error(e);
    }); 

  });

  return router;
}