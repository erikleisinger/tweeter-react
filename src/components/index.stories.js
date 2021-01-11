import React from "react";

import { storiesOf } from "@storybook/react";

import Tweet from "./Tweet";
import Tweet_Buttons from "./Tweet_Buttons";
import Like_Button from "./Like_Button";
import Counter from "./Counter"

storiesOf("Tweet", module)

  .add("Base", () => <Tweet>Hi there</Tweet>)

storiesOf("Tweet_Buttons", module)
  .add("Base", () => <Tweet_Buttons>Hi there</Tweet_Buttons>)

  storiesOf("Like_Button", module)
  .add("Base", () => <Like_Button likes="10"></Like_Button>)
  .add("Clicked", () => <Like_Button likes="10" selected="true"></Like_Button>)

  storiesOf("Counter", module)
    .add("Base", () => <Counter characters="130"/>)
    .add("Character count exceed", () => <Counter characters="141" />)
  