import React from "react";
import { render } from "react-dom";
import AuthHelper from "./helpers/auth";

const Recovery = React.createClass({
  recoverPassword: function(event) {
    event.preventDefault();
    var email = this.refs.emailInput.value;

    AuthHelper.recoverPassword(email, this.props.createNotification, this.props.router);

    this.refs.recoverForm.reset();
  },
  render() {
    return(
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Recover Password</h1>
        </div>
        <form className="overallContentArea" ref="recoverForm" onSubmit={ this.recoverPassword }>
          <input type="text" ref="emailInput" placeholder="Email address" />
          <button>Recover password</button>
        </form>
      </div>
    )
  }
});

export default Recovery;
