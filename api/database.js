const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  database: "tweeter_react",
});

pool.connect;

module.exports = {
  getTweets: function () {
    const tweets = pool.query(`
      SELECT tweets.*, users.name, users.handle, users.avatar
      FROM tweets
      JOIN users ON users.id = tweets.user_id;
    `).then((data) => {
      return data.rows
    });

    const retweets = pool.query(`
    SELECT retweets.id AS retweet_id,  retweets.tweet_id AS id,
    op.name AS op_name, 
    op.handle AS op_handle, 
    op.avatar AS op_avatar, 
    tweets.tweet_text, 
    rt.name AS rt_name, 
    rt.handle AS rt_handle,
    retweets.created_at
    FROM retweets
    JOIN tweets ON tweets.id = retweets.tweet_id
    JOIN users op ON op.id = tweets.user_id
    JOIN users rt ON rt.id = retweets.retweeter_id;
    `)
    .then((data) => {
      return data.rows;
    })

    return Promise.all([tweets, retweets])
    .then((allTweets) => {
      return {
        tweets: allTweets[0],
        retweets: allTweets[1]
      }
    })
  },

  getLikes: function() {
    return pool.query(`
    SELECT tweets.id AS tweet_id, COUNT(likes.*) AS likes
    FROM tweets
    JOIN likes ON likes.tweet_id = tweets.id
    GROUP BY tweets.id;
    `)
    .then((res) => {
      return res.rows;
    })
  },

  getRetweets: function() {
    return pool.query(`
    SELECT tweets.id AS tweet_id, COUNT(retweets.*) AS retweets
    FROM tweets
    JOIN retweets ON retweets.tweet_id = tweets.id
    GROUP BY tweets.id;
    `)
    .then((res) => {
      return res.rows;
    })
  },

  // user_id '3' is a placeholder for a generic user. 
  // post requests for specific user ids could easily be implemented with a login/register system
  // for now, it's outside scope of this project -- long live user #3!
  retweet: function(id, callback) {
    pool.query(`
      INSERT INTO retweets(tweet_id, retweeter_id, created_at)
      VALUES(
        $1, 3, CURRENT_TIMESTAMP
      )
    `,[id])
    .then((res) => {
     callback (null, res)
    })
    .catch((err) => {
      callback(err, null)
    })
  },

  newTweet: async function (text, callback) {
    pool.query(`
    INSERT INTO tweets(user_id, tweet_text, date_posted)
    VALUES(3, $1, CURRENT_TIMESTAMP)
    RETURNING *;
  `, [text])
  .then((response) => {
    return callback(null, response)
  })
  .catch((err) => {
    return callback(err, null)
  })
  }

};
