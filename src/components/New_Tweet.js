import React from "react";

import "../styles/new-tweet.scss";
import Counter from "./Counter"

const classNames = require('classnames')

export default function New_Tweet (props) {

  const showHide = classNames({
    "new-tweet": true,
    "hidden": props.closed
  })


  return (
    <section class={showHide}>
            <div className="error"></div>
            <header>
              <span>
                <h2>Compose Tweet</h2>
              </span>
              <span className="exitTweet" onClick={() => props.closeNewTweet()}>
                <h3>x</h3>
              </span>
            </header>
            <form action="/tweets" method="POST" id="submit-tweet">
              <textarea
                name="text"
                id="tweet-text"
                placeholder="What are you humming about?"
                onChange={(e) => props.onTextEntry(e)}
              ></textarea>
              <div className="lower-bar">
                <button type="submit">Tweet</button>
                <Counter characters={props.characters}/>
              </div>
            </form>
          </section>
  )
}