import React from "react"
import {useState, useEffect} from 'react';
import axios from 'axios'

import { MdClose } from 'react-icons/md'


import "../styles/new-tweet.scss";
import Counter from "./Counter"

const classNames = require('classnames')

export default function New_Tweet (props) {

  const [error, setError] = useState(null)

  const showHide = classNames({
    "new-tweet": !props.closed,
    "new-tweet-hidden": props.closed
  })

  const errorClass = classNames({
    "error": true,
    "hidden": !error
  })
 
  function submitTweet(e) {
    e.preventDefault();
    const text = {'text': e.target[0].value};
    if (text.text.length < 2) {
      setError('That tweet\'s too short, Mary')
    } else {

    axios.post('http://localhost:3060/api/tweets', text)
    .then((res) => {
      console.log('submitting...')
      props.refresh()
      e.target[0].value = '';
      props.closed = true;
    })
    .catch((err) => {
      console.log(err)
    })
  }
  }


  return (
    
    <section class={showHide}>
            <div className={errorClass}>{error}</div>
            <header>
              <span>
                <h2>Compose Tweet</h2>
              </span>
              <span className="exitTweet" onClick={() => props.toggleNewTweet()}>
                <MdClose></MdClose>
              </span>
            </header>
            <form id="submit-tweet" onSubmit={(e) => submitTweet(e)}>
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