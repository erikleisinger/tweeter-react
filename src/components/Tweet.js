import React, { useState } from "react";

import Tweet_Buttons from "./Tweet_Buttons"

import "../styles/Tweet.scss";

export default function Tweet(props) {
  const [hover, toggleHover] = useState(false)
  
  return (
    <article className="tweet" onMouseOver={() => toggleHover(true)} onMouseLeave={() => toggleHover(false)}>
      <header>
        <div className="user">
        <img src={props.avatar} alt={`${props.name}'s avatar`} />
          <span>{props.name}</span>
        </div>
        <div className="handle">{hover && `@${props.handle}`}</div>
      </header>
      <p>{props.text}</p>
      <footer>
        <div>Posted: {props.date}</div>
        <Tweet_Buttons likes={props.likes}/>
      </footer>
    </article>
  )
}
