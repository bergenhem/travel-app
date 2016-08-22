const Validator = {
  validateInput: function(typeOfValidation, value) {
    var isValid = true;
    var messageToSend = "Everything is fine!";
    switch(typeOfValidation)  {
      case "firstName":
        if(/^[A-z]+$/.test(value) === false) { isValid = false; messageToSend = "First Name is invalid!"; };
        break;
      case "lastName":
        if(/^[A-z]+$/.test(value) === false) { isValid = false; messageToSend = "Last Name is invalid!"; };
        break;
      case "password":
        if(value.length < 8) { isValid = false; messageToSend = "Password needs to be 8 characters!"; };
        break;
      case "email":
        if(/@progress.com\s*$/.test(value) === false) { isValid = false; messageToSend = "Email needs to be a valid Progress email"; }
        break;
      default:
        isValid = true;
        break;
    }

    var returnObject = {
      isValid: isValid,
      message: messageToSend
    };

    return returnObject;
  }
};

export default Validator;
