import React from "react";
import { render } from "react-dom";
import TravelItem from "./TravelItem";

const UserItem = React.createClass({
  renderTravelItems: function(travelItem, index) {
    return (
      <TravelItem key={index} item={ travelItem }/>
    )
  },
  render() {
    var details = this.props.details;
    return (
      <li>
        <h1>Name: {details.firstName}</h1>
        <ul>
          { details.travelItems.map(this.renderTravelItems) }
        </ul>
      </li>
    )
  }
});

export default UserItem;
