import React from "react";

import Tweet from "./Tweet";

export default function TweetList (props) {

  const rawTweets = [...props.tweets];
  const rawRetweets = [...props.retweets]

  const tweets = rawTweets.map((tweet) => {
    return <Tweet
      key={tweet.id}
      name={tweet.name}
      handle={tweet.handle}
      avatar={tweet.avatar}
      text={tweet.tweet_text}
      date={tweet.date_posted}
      likes={tweet.likes}
    />
  });

  const retweets = rawRetweets.map((retweet) => {
    return <Tweet
    retweet={true}
    key={retweet.id}
    name={retweet.op_name}
    handle={retweet.op_handle}
    avatar={retweet.op_avatar}
    text={retweet.tweet_text}
    date={retweet.created_at}
    likes={retweet.likes}
    rt_name={retweet.rt_name}
    rt_handle={retweet.rt_handle}
    />
  })

  const allTweets = tweets.concat(retweets).sort((a, b) => {
    return Date.parse(b.props.date) - Date.parse(a.props.date)
  })
  console.log(allTweets)

  return (
    <section 
    
    className="tweets-container">
      <ul role="tweets-container" >{allTweets}</ul>
    </section>
  )


}