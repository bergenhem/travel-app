import React from "react";
import { render } from "react-dom";
import AuthHelper from "./helpers/auth";

const Header = React.createClass({
  loginClick: function() {

  },
  logoutClick: function() {
    AuthHelper.logout(this.props.router);
  },
  render() {
    var login;
    if(AuthHelper.getUser() === null) {
      login = <li><a href="/login">Log in</a></li>;
    }
    return(
      <div className="headerMenu">
        <ul>
          { login }
          <li>
            <a href="#" onClick={ this.logoutClick }>Log out</a>
          </li>
        </ul>
      </div>
    )
  }
});

export default Header;
