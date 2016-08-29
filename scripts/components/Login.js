import React from "react";
import { render } from "react-dom";
import AuthHelper from "./helpers/auth";

const Login = React.createClass({
  login: function(event) {
    event.preventDefault();

    var email = this.refs.userInput.value;
    var password = this.refs.userInput.value;

    var login = AuthHelper.login(email, password, this.props.createNotification);

    this.refs.loginForm.reset();
  },
  render() {
    return (
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Log in</h1>
        </div>
        <form className="overallContentArea" ref="loginForm" onSubmit={ this.login }>
          <input type="text" ref="userInput" placeholder="Username" />
          <input type="password" ref="passwordInput" placeholder="Password" />
          <button>Log in</button>
          <div className="helperLinks">
            <span className="alignLeft">
              <a href="/recovery">Forgot your password?</a>
            </span>
            <span className="alignRight">
              <a href="/register">Register</a>
            </span>
          </div>
        </form>
      </div>
    )
  }
});

export default Login;
