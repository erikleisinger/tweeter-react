import React from "react";

import { FaRetweet } from 'react-icons/fa'

import "../styles/Tweet_Buttons.scss";
const classNames = require('classnames')

export default function Retweet_Button(props) {

  const className = classNames({
    "tweet-button": true, 
    "clicked": props.selected,
    "unclicked": !props.selected
  })

  return (
    <button className={className}>
      <FaRetweet />
      <span className="likes">{props.retweets}</span>
    </button>
  );
}
