import React from "react";
import { render } from "react-dom";

const Recovery = React.createClass({
  recoverPassword: function(event) {
    event.preventDefault();
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
