import React from "react";
import { render } from "react-dom";

const Register = React.createClass({
  register: function(event) {
    event.preventDefault();

    this.props.registerUser(this.refs.emailInput.value,
                            this.refs.password.value,
                            this.refs.firstName.value,
                            this.refs.lastName.value);

    this.refs.registerForm.reset();
  },
  render() {
    return(
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Register</h1>
        </div>
        <form className="overallContentArea" ref="registerForm" onSubmit={ this.register }>
          <input type="text" ref="emailInput" placeholder="Email address" />
          <input type="text" ref="firstName" placeholder="First Name" />
          <input type="text" ref="lastName" placeholder="Last Name" />
          <input type="password" ref="password" placeholder="Password" />
          <button>Register</button>
        </form>
      </div>
    )
  }
});

export default Register;
