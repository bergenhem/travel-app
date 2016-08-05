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
        <div className="radioButtonArea">
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
        </div>
        <div className={ (this.state.travelReason === "personal") ? "hidden" : null }>
          <h1>Display or hide me</h1>
        </div>
        <button className="submitTravelButton" onClick={ this.submitTravel }>Add Travel</button>
      </div>
    );
  }
});

export default Travel;
