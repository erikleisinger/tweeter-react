import React, { useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { FaRetweet } from 'react-icons/fa'

import Tweet_Buttons from "./Tweet_Buttons"

import "../styles/Tweet.scss";

export default function Tweet(props) {
  const [hover, toggleHover] = useState(false)
  const [state, setState] = useState('tweet');

  function deleteTweet() {

    if (props.retweet_id) {
    axios
    .delete(`http://localhost:3060/api/tweets/retweets/${props.retweet_id}`)
    .then((res) => {
      props.refresh()
      setState('deleted')
      setTimeout(() => {
        setState('tweet')
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    axios
    .delete(`http://localhost:3060/api/tweets/${props.tweet_id}`)
    .then((res) => {
      props.refresh()
      setState('deleted')
      setTimeout(() => {
        setState('tweet')
      }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  }
  
  return (
    <div>
    {state === "tweet" && (
      <article className="tweet" onMouseOver={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
      <header>
        {props.retweet && <div className="retweet"> <FaRetweet/>Retweeted by @{props.rt_handle}</div>}
        <div className="user">
        <img src={props.avatar} alt={`${props.name}'s avatar`} />
          <span>{props.name}</span>
        </div>
        <div className="handle">{hover && `@${props.handle}`}</div>
      </header>
      <p>{props.text}</p>
      <footer>
        <div>Posted <Moment fromNow>{props.date}</Moment></div>
        <Tweet_Buttons likes={props.likes} retweets={props.retweets} tweet_id={props.tweet_id} refresh={props.refresh} userRetweeted={props.userRetweeted} userTweeted={props.userTweeted} userLiked={props.userLiked} setState={setState}/>
      </footer>
      </article>
    )}
    {state === 'confirm' && (
      <article className="tweet confirm">
        <div>Are you sure you want to delete this tweet?</div>
        <span>
        <button onClick={() => deleteTweet()}>Yes</button>
        <button onClick={() =>  setState('tweet')}>No</button>
        </span>
      </article>
    )}
    {state === 'deleted' && (
      <article className="tweet confirm">
        <div>Tweet deleted!</div>
      </article>
    )}
  </div>
  )
}
