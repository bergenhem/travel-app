import React from "react";
import { render } from "react-dom";

const TravelItem = React.createClass({
  // Only show the "company" field if this is work related
  renderCompanySection: function(details) {
    if(this.props.item.type === "Work") {
      return (
        <div className="singleItem">
          <strong>Company: </strong><span> { details.companyName }</span>
        </div>
      )
    }
  },
  render() {
    var details = this.props.item;
    var typeStyle;
    if(details.type === "Work") {
      typeStyle = {
        backgroundColor: "#EDE7F6"
      };
    }
    else {
      typeStyle = {
        backgroundColor: "#E8F5E9"
      };
    }
    return (
      <li>
        <div className="detailItem" style={ typeStyle }>
          <div className="singleItem">
            <strong>Dates: </strong>{ details.startDate } - { details.endDate }
          </div>
          <div className="singleItem">
            <strong>Type: </strong><span> { details.type }</span>
          </div>
          { this.renderCompanySection(details) }
        </div>
      </li>
    )
  }
});

export default TravelItem;
