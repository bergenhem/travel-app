import React from "react";
import { render } from "react-dom";
import AuthHelper from "./helpers/auth";

const Header = React.createClass({
  loginClick: function() {

  },
  logoutClick: function() {
    AuthHelper.logout();
  },
  render() {
    return(
      <div className="headerMenu">
        <ul>
          <li>
            <a href="/login">Log in</a>
          </li>
          <li>
            <a href="#" onClick={ this.logoutClick }>Log out</a>
          </li>
        </ul>
      </div>
    )
  }
});

export default Header;
