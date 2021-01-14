import {useState, useEffect} from "react";

import Delete_Button from "./Delete_Button"
import Flag_Button from "./Flag_Button"
import Like_Button from "./Like_Button"
import Retweet_Button from "./Retweet_Button"

import "../styles/Tweet_Buttons.scss"

export default function Tweet_Buttons (props) {

  const [deleteButton, setDeleteButton] = useState(false)

useEffect(() => {
  if (props.userRetweeted || props.userTweeted) {
    setDeleteButton(true)
  }
}, [])


  return (
    <div className="tweet-buttons">
          <Like_Button 
            likes={props.likes}
            refresh={props.refresh}
            tweet_id={props.tweet_id}
            userLiked={props.userLiked}
          />
          <Retweet_Button retweets={props.retweets} tweet_id={props.tweet_id} refresh={props.refresh} userRetweeted={props.userRetweeted}/>

         <Flag_Button />
         {deleteButton && <Delete_Button setState={props.setState}/>}
        </div>
  )
}