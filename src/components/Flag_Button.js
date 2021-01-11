import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons'

import "../styles/Tweet_Buttons.scss";

export default function Flag_Button(props) {

  return (
    <button className="tweet-button unclicked">
      <FontAwesomeIcon icon={faFlag} />
      <span>{props.likes}</span>
    </button>
  );
}
