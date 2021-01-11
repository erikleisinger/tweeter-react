import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import "../styles/Tweet_Buttons.scss";

const classNames = require('classnames')

export default function Like_Button(props) {

  const className = classNames({
    "tweet-button": true, 
    "clicked": props.selected,
    "unclicked": !props.selected
  })


  return (
    <button className={className}>
      <FontAwesomeIcon icon={faHeart} />
      <span className="likes">{props.likes}</span>
    </button>
  );
}
