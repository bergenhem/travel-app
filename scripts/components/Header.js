import React from "react";
import { render } from "react-dom";

const Header = React.createClass({
  render() {
    return(
      <div className="headerMenu">
        <ul>
          <li>
            <a href="/login">Log in</a>
          </li>
          <li>
            <a href="/login">Log out</a>
          </li>
        </ul>
      </div>
    )
  }
});

export default Header;
