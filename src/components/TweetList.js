import React from "react";

import Tweet from "./Tweet";

export default function TweetList (props) {
  

  const tweets = props.tweets.map((tweet) => {
    console.log(tweet)
    return <Tweet
      retweet={(tweet.rt_name || false)}
      rt_handle={tweet.rt_handle || null}
      tweet_id={tweet.id}
      name={tweet.name || tweet.op_name}
      handle={tweet.handle || tweet.op_handle}
      avatar={tweet.avatar || tweet.op_avatar}
      text={tweet.tweet_text}
      date={tweet.date_posted || tweet.created_at}
      likes={tweet.likes || '0'}
      retweets={tweet.retweets|| '0'}
      refresh={props.refresh}
    />
  }).sort((a, b) => {
      return Date.parse(b.props.date) - Date.parse(a.props.date)
    })

  return (
    <section 
    
    className="tweets-container">
      <ul role="tweets-container" >{tweets}</ul>
    </section>
  )


}