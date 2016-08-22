import React from "react";
import { render } from "react-dom";

const ValidateInput = React.createClass({
  getInitialState: function() {
    return {
      isValid: true
    }
  },
  propTypes: {
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string
  },
  checkIfValid: function(typeOfValidation) {
    var input = this.refs.internalInput.value;
    var isFormValid = true;
    if(typeOfValidation === "email") {
      if(/@progress.com\s*$/.test(input) === false) {
        isFormValid = false;
        this.props.createNotification("error", "Email needs to be @progress.com", "Validation Error", 4000);
      }
    }
    this.state.isValid = isFormValid;
    this.setState({
      isValid: this.state.isValid
    });

  },
  render() {
    return (
      <input ref="internalInput" className={ this.state.isValid ? "" : "invalid" } type={ this.props.type } placeholder={ this.props.placeholder } />
    )
  }
});

export default ValidateInput;
