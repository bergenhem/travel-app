import React from "react";
import { render } from "react-dom";

const Travel = React.createClass({
  getInitialState: function() {
    return { travelReason: "Work" }
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
    console.log("Adding travel item...");
    event.preventDefault();
    var travelItem = {
      type: this.state.travelReason,
      startDate: this.refs.startDate.value,
      endDate: this.refs.endDate.value,
      companyName: this.refs.companyName.value
    }
    // form.reset() clears the radio button, so let's manually clear things
    this.refs.startDate.value = "";
    this.refs.endDate.value = "";
    this.refs.companyName.value = "";

    this.props.addTravelItem(travelItem);
  },
  // Design for the form inspired by: http://codepen.io/colorlib/pen/rxddKy
  // Design for the switch inspired by: http://codepen.io/kylephillips/pen/MYwXqV
  render() {
    return(
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Add Travel</h1>
        </div>
        <form className="overallContentArea" ref="travelForm" onSubmit={ this.submitTravel }>
          <div className="radioButtonArea">
            <div className="switch">
              <div className="travelRadioButton">
                <input id="workOption" type="radio" name="travelType" value="Work"
                  checked={ this.state.travelReason === "Work" }
                  onChange={ this.reasonChange } />
                <label htmlFor="workOption">Work</label>
              </div>
              <div className="travelRadioButton">
                <input id="personalOption" type="radio" name="travelType" value="Personal"
                  checked={ this.state.travelReason === "Personal" }
                  onChange={ this.reasonChange } />
                <label htmlFor="personalOption">Personal</label>
              </div>
              <span className={ (this.state.travelReason != "Work") ? "right" : null } aria-hidden="true"></span>
            </div>
          </div>
          {/* This is the personal-related input area */}
          <div>
            <input ref="startDate" id="startDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="Start Date" />
            <input ref="endDate" id="endDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="End Date" />
          </div>
          {/* This is the work-related input area */}
          <div className={ (this.state.travelReason != "Work") ? "hidden" : null }>
            <input ref="companyName" id="companyInput" type="text" placeholder="Company Name"/>
          </div>
          <button>Add Travel</button>
        </form>
      </div>
    );
  }
});

export default Travel;
