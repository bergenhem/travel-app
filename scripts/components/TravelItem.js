import React from "react";
import { render } from "react-dom";

const TravelItem = React.createClass({
  render() {
    var details = this.props.item;
    return (
      <div>
        <h1>Name: {details.companyName}</h1>
      </div>
    )
  }
});

export default TravelItem;
