import React from "react";

import Tweet from "./Tweet";

export default function TweetList (props) {
  

  const tweets = props.tweets.map((tweet) => {
    return <Tweet 
      avatar={tweet.avatar || tweet.op_avatar}
      date={tweet.date_posted || tweet.created_at}
      handle={tweet.handle || tweet.op_handle}
      likes={tweet.likes || '0'}
      name={tweet.name || tweet.op_name}
      refresh={props.refresh}
      retweet={(tweet.rt_name || false)}
      retweets={tweet.retweets|| '0'}
      rt_handle={tweet.rt_handle || null}
      text={tweet.tweet_text}
      tweet_id={tweet.id}
      retweet_id={tweet.retweet_id}
      userLiked={props.user_likes.some(ele => ele === tweet.id) && true}
      userRetweeted={props.user_retweets.some(ele => ele === tweet.id) && true}
      userTweeted={props.tweets.some(ele => ele.user_id === 3)}
    />
  }).sort((a, b) => {
      return Date.parse(b.props.date) - Date.parse(a.props.date)
    })

  return (
    <section 
    
    className="tweets-container">
      {tweets}
    </section>
  )


}