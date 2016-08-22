import React from "react";
import { render } from "react-dom";
import ValidatorHelper from "./helpers/validation";

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

    var validationCheck = ValidatorHelper.validateInput(typeOfValidation, input);
    this.state.isValid = validationCheck.isValid;
    this.setState({
      isValid: this.state.isValid
    });

    if(validationCheck.isValid === false) {
      return validationCheck.message;
    }
    else {
      return null;
    }

  },
  value: function() {
    return this.refs.internalInput.value;
  },
  reset: function() {
    this.refs.internalInput.value = "";
  },
  render() {
    return (
      <input ref="internalInput" className={ this.state.isValid ? "" : "invalid" } type={ this.props.type } placeholder={ this.props.placeholder } />
    )
  }
});

export default ValidateInput;
