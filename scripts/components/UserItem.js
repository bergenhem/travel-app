import React from "react";
import { render } from "react-dom";
import TravelItem from "./TravelItem";

const UserItem = React.createClass({
  renderContent: function(details) {
    if(details.travelItems) {
      return(
        <ul>
            { details.travelItems.map(this.renderTravelItems) }
        </ul>
      )
    }
  },
  renderTravelItems: function(travelItem, index) {
    return (
      <TravelItem key={index} item={ travelItem }/>
    )
  },
  render() {
    var details = this.props.details;
    return (
      <li>
        <h1>{ details.firstName } { details.lastName }</h1>
        { this.renderContent(details) }
      </li>
    )
  }
});

export default UserItem;
