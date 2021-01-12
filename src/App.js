
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
    tweets: [],
    user_retweets: [],
    user_likes: [],
    refresh: false
  });

  useEffect(() => {

      const tweets = axios
      .get('http://localhost:3060/api/tweets')
      .then((data) => {
        const tweets = data.data
        return tweets;
      }).catch((err) => {
        console.log(err)
        return err;
      })

      const retweets = axios
      .get('http://localhost:3060/api/users/3/retweets')
      .then((data) => {
        const retweets = data.data;
        return retweets;
      })
      .catch((err) => {
        console.log(err)
      })

      const likes = axios
      .get('http://localhost:3060/api/users/3/likes')
      .then((data) => {
        const likes = data.data;
        return likes;
      })
      .catch((err) => {
        console.log(err)
      })

      Promise.all([tweets, retweets, likes])
      .then((data) => {
        setState({...state, tweets: data[0], user_retweets: data[1], user_likes: data[2]})
      })
    
    },[state.refresh]);

  function refreshPage () {
      setState({...state, refresh: !state.refresh})
    }

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
          refresh={refreshPage}
          />}
          
          <TweetList tweets={state.tweets} user_retweets={state.user_retweets} refresh={refreshPage} user_likes={state.user_likes}/>
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
