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

  return (
    <section 
    
    className="tweets-container">
      <ul role="tweets-container" >{tweets}</ul>
    </section>
  )


}