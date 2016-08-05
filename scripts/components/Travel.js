import React from "react";
import { render } from "react-dom";

const Travel = React.createClass({
  getInitialState: function() {
    return { travelReason: "work" }
  },
  reasonChange: function(event) {
    this.setState({ travelReason: event.target.value });
  },
  submitTravel: function(event) {
    console.log("add item");
    console.log(event.target);
  },
  render() {
    return(
      <div>
        <div className="travelRadioButton">
          <input type="radio" name="travelType" value="work"
            checked={ this.state.travelReason === "work" }
            onChange={ this.reasonChange } />
          Work
        </div>
        <div className="travelRadioButton">
          <input type="radio" name="travelType" value="personal"
            checked={ this.state.travelReason === "personal" }
            onChange={ this.reasonChange } />
          Personal
        </div>
        <button className="submitTravelButton" onClick={ this.submitTravel }>Add Travel</button>
      </div>
    );
  }
});

export default Travel;
