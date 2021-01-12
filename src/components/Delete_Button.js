import React from "react";
import axios from "axios";

import { AiFillDelete } from 'react-icons/ai'

import "../styles/Tweet_Buttons.scss";
const classNames = require('classnames')

export default function Retweet_Button(props) {

  const className = classNames({
    "tweet-button unclicked": true, 
  })

  return (
    <button className={className} onClick={() => props.setState('confirm')}>
      <AiFillDelete size="1.1em"/>
    </button>
  );
}
