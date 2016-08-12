import React from "react";
import { render } from "react-dom";

const Register = React.createClass({
  getInitialState: function() {
    return {
      isValid: true
    }
  },
  register: function(event) {
    event.preventDefault();
    this.validateForm();

    if(this.state.isValid === true) {
      this.props.registerUser(this.refs.emailInput.value,
                             this.refs.passwordInput.value,
                             this.refs.firstNameInput.value,
                             this.refs.lastNameInput.value);

      this.refs.registerForm.reset();
    }
  },
  // This isn't a great way to do validation, but for simplicities sake we'll just do it this way
  validateForm: function() {
    var email = this.refs.emailInput.value;
    var password = this.refs.passwordInput.value;
    var firstName = this.refs.firstNameInput.value;
    var lastName = this.refs.lastNameInput.value;
    var isFormValid = true;

    if(/^[A-z]+$/.test(firstName) === false) {
      isFormValid = false;
      console.log("First name is invalid");
    }
    if(/^[A-z]+$/.test(lastName) === false) {
      isFormValid = false;
      console.log("Last name is invalid");
    }
    if(password.length < 8) {
      isFormValid = false;
      console.log("password is weak");
    }
    if(/@progress.com\s*$/.test(email) === false) {
      isFormValid = false;
      console.log("Email is not a Progress email");
    }
    this.state.isValid = isFormValid;
    this.setState({
      isValid: this.state.isValid
    });
  },
  render() {
    return(
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Register</h1>
        </div>
        <form className="overallContentArea" ref="registerForm" onSubmit={ this.register }>
          <input type="text" ref="emailInput" placeholder="Email address" />
          <input type="text" ref="firstNameInput" placeholder="First Name" />
          <input type="text" ref="lastNameInput" placeholder="Last Name" />
          <input type="password" ref="passwordInput" placeholder="Password" />
          <button>Register</button>
        </form>
      </div>
    )
  }
});

export default Register;
