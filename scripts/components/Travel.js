import React from "react";
import { render } from "react-dom";

const Travel = React.createClass({
  getInitialState: function() {
    return { travelReason: "work" }
  },
  reasonChange: function(event) {
    this.setState({ travelReason: event.target.value });
  },
  changeType: function(event) {
    var currentType = event.target.type;
    var currentTarget = event.target;

    if(currentType === "text") {
      currentTarget.type = "date";
    }
    else if(currentType === "date") {
        currentTarget.type = "text";
    }
  },
  submitTravel: function(event) {
    event.preventDefault();
    console.log("Adding travel item");
    var travelItem = {
      type: this.state.travelReason,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
      companyName: this.refs.companyName.value
    }
    this.props.addTravelItem(travelItem);
  },
  // Design for the form inspired by: http://codepen.io/colorlib/pen/rxddKy
  // Design for the switch inspired by: http://codepen.io/kylephillips/pen/MYwXqV
  render() {
    return(
      <div className="travelArea">
        <div className="travelHeader">
          <h1>Add Travel</h1>
        </div>
        <div className="travelContentArea">
          <div className="radioButtonArea">
            <div className="switch">
              <div className="travelRadioButton">
                <input id="workOption" type="radio" name="travelType" value="work"
                  checked={ this.state.travelReason === "work" }
                  onChange={ this.reasonChange } />
                <label htmlFor="workOption">Work</label>
              </div>
              <div className="travelRadioButton">
                <input id="personalOption" type="radio" name="travelType" value="personal"
                  checked={ this.state.travelReason === "personal" }
                  onChange={ this.reasonChange } />
                <label htmlFor="personalOption">Personal</label>
              </div>
              <span className={ (this.state.travelReason != "work") ? "right" : null } aria-hidden="true"></span>
            </div>
          </div>
          {/* This is the personal-related input area */}
          <div className="dateInputArea">
            <input ref="startDate" id="startDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="Start Date" />
            <input ref="endDate" id="endDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="End Date" />
          </div>
          {/* This is the work-related input area */}
          <div className={ (this.state.travelReason != "work") ? "hidden" : null }>
            <input ref="companyName" id="companyInput" type="text" placeholder="Company Name"/>
          </div>
          <button className="submitTravelButton" onClick={ this.submitTravel }>Add Travel</button>
        </div>
      </div>
    );
  }
});

export default Travel;
