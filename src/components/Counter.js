import React from "react";


import "../styles/Counter.scss"
const classNames = require('classnames')

export default function Counter(props) {
  
  const counterClass = classNames({
    'exceeded': props.characters < 0
  })

  return (
    <div className={counterClass}>
      {props.characters < 0 && <span id="charactersExceeded"> Character limit exceeded</span>}
      <output name="counter" class="counter" for="tweet-text">
        {props.characters}
      </output>
    </div>
  );
}
