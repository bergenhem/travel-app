import React from "react";
import { render } from "react-dom";

const Login = React.createClass({
  login: function(event) {
    event.preventDefault();
    this.refs.loginForm.reset();
  },
  render() {
    return (
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Log in</h1>
        </div>
        <form className="overallContentArea" ref="loginForm" onSubmit={ this.login }>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
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
