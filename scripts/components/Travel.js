import React from "react";
import { render } from "react-dom";

const Travel = React.createClass({
  getInitialState: function() {
    return { travelReason: "work" }
  },
  reasonChange: function(event) {
    this.setState({ travelReason: event.target.value });


    // $('.switch label').on('click', function(){
    //   var indicator = $(this).parent('.switch').find('span');
    //   if ( $(this).hasClass('right') ){
    // 		$(indicator).addClass('right');
    //   } else {
    //     $(indicator).removeClass('right');
    //   }
    // });

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
    console.log("add item");
    console.log(event.target);
  },
  render() {
    return(
      <div className="travelArea">
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
          <label htmlFor="startDate">Start Date</label><input id="startDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="Start Date" />
          <label htmlFor="endDate">End Date</label><input id="endDate" type="text" onFocus={ this.changeType } onBlur={ this.changeType } placeholder="End Date" />
        </div>
        {/* This is the work-related input area */}
        <div className={ (this.state.travelReason != "work") ? "hidden" : null }>
          <label htmlFor="companyInput">Company Name</label><input id="companyInput" type="text" placeholder="Company Name"/>
        </div>
        <button className="submitTravelButton" onClick={ this.submitTravel }>Add Travel</button>
      </div>
    );
  }
});

export default Travel;
