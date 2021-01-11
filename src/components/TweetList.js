import React from "react";

import Tweet from "./Tweet";

export default function TweetList (props) {

  const tweets = [...props.tweets];

  const allTweets = tweets.map((tweet) => {
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
      <ul role="tweets-container" >{allTweets}</ul>
    </section>
  )


}