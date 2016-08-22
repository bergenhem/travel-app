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
    var email = this.refs.emailInput;
    var password = this.refs.passwordInput;
    var firstName = this.refs.firstNameInput;
    var lastName = this.refs.lastNameInput;
    var isFormValid = true;

    email.checkIfValid("email");
    password.checkIfValid("password");
    firstName.checkIfValid("firstName");
    lastName.checkIfValid("lastName");

    if(email.state.isValid === false || password.state.isValid === false ||
       firstName.state.isValid === false || lastName.state.isValid === false) {
         isFormValid = false;
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
