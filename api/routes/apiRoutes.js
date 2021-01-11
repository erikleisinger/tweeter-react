const database = require('../database');

module.exports = function(router, database) {

  router.get('/tweeter', (req, res) => {
    database.getTweets()
    .then((tweets) => {
      res.send(tweets)
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  return router;
}