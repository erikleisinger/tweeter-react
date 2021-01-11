import React from "react";

import { storiesOf } from "@storybook/react";

import Tweet from "../components/Tweet";
import Tweet_Buttons from "../components/Tweet_Buttons";
import Like_Button from "../components/Like_Button";
import Counter from "../components/Counter"

const tweetInfo = require('./story_data')

storiesOf("Tweet", module)

  .add("Base", () => 
  <Tweet 
  name={tweetInfo.name} 
  avatar={tweetInfo.avatar} 
  handle={tweetInfo.handle}
  text={tweetInfo.text}
  date={tweetInfo.date}
  >This is a Tweet</Tweet>
  )
  .add("Retweet", () => 
  <Tweet 
  retweet={true}
  name={tweetInfo.name} 
  avatar={tweetInfo.avatar} 
  handle={tweetInfo.handle}
  text={tweetInfo.text}
  date={tweetInfo.date}
  >This is a Retweet</Tweet>)

storiesOf("Tweet_Buttons", module)
  .add("Base", () => <Tweet_Buttons>Hi there</Tweet_Buttons>)

  storiesOf("Like_Button", module)
  .add("Base", () => <Like_Button likes="10"></Like_Button>)
  .add("Clicked", () => <Like_Button likes="10" selected="true"></Like_Button>)

  storiesOf("Counter", module)
    .add("Base", () => <Counter characters="130"/>)
    .add("Character count exceed", () => <Counter characters="141" />)
  