const database = require('../database');

module.exports = function(router, database) {

  router.get('/tweets', async (req, res) => {

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


    await database.getTweets()
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

      res.send(tweetsWithLikesAndRetweets)
    })
    .catch(e => {
      console.error(e);
    }); 

  });
  router.post('/tweets', (req, res) => {
    // '3' is a placeholder; if user accounts are added, '3' would correspond to a user's unique id
    // database.newTweet(3)
    const text = req.body.text;

    database.newTweet(text, (err, response) => {
      if (err) {
        res.status(400).send()
      } else {
        res.send(response)
      }
    })
   
  })

  router.post('/tweets/retweet/:id', (req, res) => {
    const id = req.params.id;
    
   database.retweet(id, (err, response) => {
    if (err) {
      res.status(400).send()
    } else {
      res.send(response)
    }
   })
  })
  router.post('/tweets/like/:id', (req, res) => {
    console.log('likeeeee')
    const tweet_id = req.params.id;
    
   database.likePost(tweet_id, (err, response) => {
    if (err) {
      res.status(400).send()
    } else {
      res.send(response)
    }
   })
  })

  router.delete('/users/:user_id/likes/:tweet_id', (req, res) => {
   database.unlikePost(req.params.user_id, req.params.tweet_id, (err, response) => {
    if (err) {
      res.status(400).send()
    } else {
      res.send(response)
    }
   })
  })

  router.delete('/tweets/retweets/:id', (req, res) => {
    database.deleteRetweet(req.params.id,(err, response) => {
     if (err) {
       console.log(err)
       res.status(400).send()
     } else {
       console.log('tweet deleted')
       res.send(response)
     }
    })
   })

  router.get('/users/:id/retweets', (req, res) => {
    const user_id = req.params.id;

    database.getUserRetweets(user_id, (err, response) => {
      if (err) {
        res.status(400).send()
      } else {
        res.send(response)
      }
    })
  })
  router.get('/users/:id/likes', (req, res) => {
    const user_id = req.params.id;
    database.getUserLikes(user_id, (err, response) => {
      if (err) {
        res.status(400).send()
      } else {
        res.send(response)
      }
    })
  })
  return router;
}