
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useTransition, animated, useSpring} from 'react-spring'

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

  const [toggle, setToggle] = useState(false);

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

  function toggleNewTweet () {
    setState({...state, new_tweet: !state.new_tweet})
  }

  function tweetText(chars) {
    const characters = 140 - chars.target.value.length;
    setState({...state, characterCount: characters})
  }

  const transitions = useTransition(state.new_tweet, null, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0}
  })

  // const props = useSpring({
  //   config: { duration: 5000}, 
  //   opacity: state.new_tweet ? 1 : 0, 
  //   display: state.new_tweet? 'block' : 'none',
  
  // })

  const props = useSpring({ 
    config: { duration: 300},
    to: async (next, cancel) => {
      if (state.new_tweet) {
        await next({display: 'flex'})
        await next({height: '200px'})
      } else {
        await next({height: '0px'})
        await next({display: 'none'})
      }
    },
    from: { height: '0px', display: 'none'}
  })

  return (
    <body>
      <Nav 
        toggleNewTweet={toggleNewTweet}
        new_tweet={state.new_tweet}
      />
      <div className="container">
        
        <Header name="Erik" avatar="../../images/profile-hex.png"/>

        <main className="tweetsContainer">
        <animated.div style={props}>
          <New_Tweet 
          className="example"
          toggleNewTweet={toggleNewTweet}
          onTextEntry={tweetText}
          characters={state.characterCount}
          refresh={refreshPage}
          />
          </animated.div>
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
