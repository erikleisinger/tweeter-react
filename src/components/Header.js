import React from "react";

import "../styles/Header.scss";

export default function Header (props) {
  return (
    <header className="header-page">
          <div>
            <img src={props.avatar} />
          </div>
          <div>
            <h2>{props.name}</h2>
          </div>
        </header>
  )
}