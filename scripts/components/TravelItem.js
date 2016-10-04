import React from "react";
import { render } from "react-dom";

const TravelItem = React.createClass({
  render() {
    var details = this.props.item;
    var typeStyle;
    if(details.type === "work") {
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
          <div className="singleItem">
            <strong>Company: </strong><span> { details.companyName }</span>
          </div>
        </div>
      </li>
    )
  }
});

export default TravelItem;
