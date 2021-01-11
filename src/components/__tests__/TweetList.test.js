import React from "react";

import { render, prettyDOM } from "@testing-library/react";

import TweetList from "../TweetList";

describe("TweetList", () => {
  const tweets = [
    {
    id: 1,
    name: "Paul Giamatti",
    handle: "paulogio",
    avatar: "https://i.imgur.com/73hZDYK.png",
    tweet_text: "Wow this tweeter thing is great",
    date_posted: "1999-01-08T04:05:06.000Z"
    },
    {
    id: 2,
    name: "Descartes",
    handle: "rd",
    avatar: "https://i.imgur.com/nlhLi3I.png",
    tweet_text: "I think therefore I am",
    date_posted: "1999-01-08T04:05:06.000Z"
    }
  ];

  it("should render", () => {
    render(<TweetList tweets="" />)
  });
  it("should contain two tweets", () => {
    const { getByRole } = render(<TweetList tweets={tweets} />)
    const container = getByRole("tweets-container")
    expect(container.children).toHaveLength(2);
  })
})