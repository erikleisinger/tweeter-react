import React from "react";

import "../styles/nav.scss";
import "../styles/fonts.scss";

import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Nav(props) {
  return (
    <nav>
      <span>tweeter</span>
      <span>
        <button type="button" className="newTweetButton" onClick={() => props.writeNewTweet()}>
          <b>Write</b> a new tweet <br />
          <FontAwesomeIcon icon={faAngleDoubleDown} />
        </button>
      </span>
    </nav>
  );
}
