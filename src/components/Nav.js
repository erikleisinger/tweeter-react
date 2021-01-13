import React from "react";

import "../styles/nav.scss";
import "../styles/fonts.scss";

import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

export default function Nav(props) {
  return (
    <nav>
      <span>tweeter</span>
      <span>
        <button type="button" className="newTweetButton" onClick={() => props.toggleNewTweet()}>
          <b>Write</b> a new tweet <br />
          {props.new_tweet ? <FaAngleDoubleUp className="downArrow" /> : <FaAngleDoubleDown className="downArrow" />}
        </button>
      </span>
    </nav>
  );
}
