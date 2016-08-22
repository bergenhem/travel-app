import React from "react";
import { render } from "react-dom";
import ValidateInput from "./ValidateInput";

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

    console.log("new");
    console.log(this.refs.emailInput);
    this.refs.emailInput.checkIfValid("email");

    if(/^[A-z]+$/.test(firstName) === false) {
      isFormValid = false;
      this.props.createNotification("error", "First name is invalid", "Validation Error", 4000);
    }
    if(/^[A-z]+$/.test(lastName) === false) {
      isFormValid = false;
      this.props.createNotification("error", "Last name is invalid", "Validation Error", 4000);
    }
    if(password.length < 8) {
      isFormValid = false;
      this.props.createNotification("error", "Password needs to be 8+ characters", "Validation Error", 4000);
    }
    if(/@progress.com\s*$/.test(email) === false) {
      isFormValid = false;
      this.props.createNotification("error", "Email needs to be @progress.com", "Validation Error", 4000);
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
          <ValidateInput type="text" ref="emailInput" placeholder="Email" createNotification={ this.props. createNotification } />
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
