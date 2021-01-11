import React from "react";
import Like_Button from "./Like_Button"
import Flag_Button from "./Flag_Button"
import Retweet_Button from "./Retweet_Button"

import "../styles/Tweet_Buttons.scss"

export default function Tweet_Buttons (props) {
  return (
    <div className="tweet-buttons">
          <Like_Button 
            likes={props.likes}
          />
          <Retweet_Button retweets={props.retweets}/>
         <Flag_Button />
        </div>
  )
}