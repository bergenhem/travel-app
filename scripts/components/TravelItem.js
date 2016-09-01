import React from "react";
import { render } from "react-dom";

const TravelItem = React.createClass({
  render() {
    var details = this.props.item;
    return (
      <li>
        <h1>Name: {details.companyName}</h1>
      </li>
    )
  }
});

export default TravelItem;
