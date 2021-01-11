import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons'

import "../styles/Tweet_Buttons.scss";

export default function Retweet_Button(props) {

  return (
    <button className="tweet-button unclicked">
      <FontAwesomeIcon icon={faRetweet} />
      <span className="likes">{props.likes}</span>
    </button>
  );
}
