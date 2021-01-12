import React from "react";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "../styles/Tweet_Buttons.scss";

const classNames = require('classnames')

export default function Like_Button(props) {

  const className = classNames({
    "tweet-button": true, 
    "clicked": props.userLiked,
    "unclicked": !props.userLiked
  })

  function likePost () {
    if (props.userLiked) {
      axios
      .delete(`http://localhost:3060/api/users/3/likes/${props.tweet_id}`)
      .then((res) => {
        console.log(res)
        props.refresh();
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      axios
      .post(`http://localhost:3060/api/tweets/like/${props.tweet_id}`)
      .then((res) => {
        props.refresh();
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }


  return (
    <button className={className} onClick={() => likePost()}>
      <FontAwesomeIcon icon={faHeart} />
      <span>{props.likes}</span>
    </button>
  );
}
