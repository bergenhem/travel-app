import React from "react";
import { render } from "react-dom";
import TravelItem from "./TravelItem";
import Moment from "moment";

const UserItem = React.createClass({
  renderTravelSection: function(details) {

    if(details.travelItems) {
      return(
        <ul>
            { details.travelItems.map(this.renderTravelItems) }
        </ul>
      )
    }
    else {
      return <span>No upcoming travel</span>
    }
  },
  checkDate: function(date) {
    return moment(date).isAfter(moment());
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
        { this.renderTravelSection(details) }
      </li>
    )
  }
});

export default UserItem;
