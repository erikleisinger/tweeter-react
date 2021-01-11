import React, { useState } from "react";
import Moment from "react-moment";
import { FaRetweet } from 'react-icons/fa'

import Tweet_Buttons from "./Tweet_Buttons"

import "../styles/Tweet.scss";

export default function Tweet(props) {
  const [hover, toggleHover] = useState(false)
  
  return (
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
        <div>Posted:<Moment >{props.date}</Moment></div>
        <Tweet_Buttons likes={props.likes}/>
      </footer>
    </article>
  )
}
