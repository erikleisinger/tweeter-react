import React from "react";
import axios from "axios";

import { FaRetweet } from 'react-icons/fa'

import "../styles/Tweet_Buttons.scss";
const classNames = require('classnames')

export default function Retweet_Button(props) {

  const className = classNames({
    "tweet-button": true, 
    "clicked": props.selected,
    "unclicked": !props.selected
  })

  function retweet () {
    axios.post(`http://localhost:3060/api/tweets/retweet/${props.tweet_id}`)
    .then((res) => {
      props.refresh();
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <button className={className}>
      <FaRetweet onClick={() => retweet()}/>
      <span className="likes">{props.retweets}</span>
    </button>
  );
}
