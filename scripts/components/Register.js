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
      this.props.registerUser(this.refs.emailInput.value(),
                             this.refs.passwordInput.value(),
                             this.refs.firstNameInput.value(),
                             this.refs.lastNameInput.value());

      this.refs.registerForm.reset();
    }
  },
  // This isn't a great way to do validation, but for simplicities sake we'll just do it this way
  validateForm: function() {
    var email = this.refs.emailInput;
    var password = this.refs.passwordInput;
    var firstName = this.refs.firstNameInput;
    var lastName = this.refs.lastNameInput;
    var isFormValid = true;
    var errorArray = [];

    var emailCheck = email.checkIfValid("email")
    if(emailCheck != null) { errorArray.push(emailCheck) };

    var firstNameCheck = firstName.checkIfValid("firstName");
    if(firstNameCheck != null) { errorArray.push(firstNameCheck) };

    var lastNameCheck = lastName.checkIfValid("lastName");
    if(lastNameCheck != null) { errorArray.push(lastNameCheck) };

    var passwordCheck = password.checkIfValid("password");
    if(passwordCheck != null) { errorArray.push(passwordCheck) };

    /*
      This is a workaround to due to making more than two consecutive calls to createNotification
      will error out due to similar keys being used. doSetTimeOut is a part of this workaround
    */
    for(var i = 0; i < errorArray.length; i++) {
      this.doSetTimeOut(errorArray[i]);
    }

    if(email.state.isValid === false || password.state.isValid === false ||
       firstName.state.isValid === false || lastName.state.isValid === false) {
         isFormValid = false;
    }

    this.state.isValid = isFormValid;
    this.setState({
      isValid: this.state.isValid
    });
  },
  // This is just here for the notification workaround
  doSetTimeOut(message) {
    setTimeout(function() {
      this.props.createNotification("error", message, "Validation Error", 4000);
    }.bind(this), 100);
  },
  render() {
    return(
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Register</h1>
        </div>
        <form className="overallContentArea" ref="registerForm" onSubmit={ this.register }>
          <ValidateInput type="text" ref="emailInput" placeholder="Email" createNotification={ this.props. createNotification } />
          <ValidateInput type="text" ref="firstNameInput" placeholder="First Name" createNotification={ this.props. createNotification } />
          <ValidateInput type="text" ref="lastNameInput" placeholder="Last Name" createNotification={ this.props. createNotification } />
          <ValidateInput type="password" ref="passwordInput" placeholder="Password" createNotification={ this.props. createNotification } />
          <button>Register</button>
        </form>
      </div>
    )
  }
});

export default Register;
