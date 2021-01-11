
import React, {useState, useEffect} from "react";
import axios from "axios";

import "./styles/App.scss";
import "./styles/Header.scss";
import "./styles/nav.scss";

import Nav from "./components/Nav"
import Header from "./components/Header"
import New_Tweet from "./components/New_Tweet"
import TweetList from "./components/TweetList"

function App() {
  const [ state, setState] = useState({
    new_tweet: false,
    characterCount: 140,
    tweets: []
  });

  useEffect(() => {
    
      axios
      .get('http://localhost:3060/api/tweeter')
      .then((data) => {
        setState({...state, tweets: data.data})
      }).catch((err) => {
        console.log(err)
      })
    },[]);

  function writeNewTweet () {
    setState({...state, new_tweet: true})
  }

  function closeNewTweet () {
    setState({...state, characterCount: 140, new_tweet: false})
  }
  
  function tweetText(chars) {
    const characters = 140 - chars.target.value.length;
    setState({...state, characterCount: characters})
  }

  return (
    <body>
      <Nav 
        writeNewTweet={writeNewTweet}
      />
      <div className="container">
        
        <Header name="Erik" avatar="../../images/profile-hex.png"/>

        <main className="tweetsContainer">
          {state.new_tweet && <New_Tweet 
          closeNewTweet={closeNewTweet}
          onTextEntry={tweetText}
          characters={state.characterCount}
          />}
          
          <TweetList tweets={state.tweets}/>
        </main>
        <footer>Copyright TweeterCorp</footer>
        <div className="arrowToTop">
          <i className="fas fa-chevron-circle-up"></i>
        </div>
      </div>
    </body>
  );
}

export default App;
