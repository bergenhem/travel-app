import React from "react";
import { render } from "react-dom";
import TravelItem from "./TravelItem";
import Moment from "moment";

const UserItem = React.createClass({
  renderTravelSection: function(details) {
    if(details.travelItems) {
      var travelItemsToDisplay = details.travelItems.map(this.filterDates)
                                  .filter(function(item) { //filter all of our undefined items
                                    return typeof item !== "undefined";
                                  });
      if(travelItemsToDisplay.length > 0) {
        return(
          <ul>
              { travelItemsToDisplay.map(this.renderTravelItems) }
          </ul>
        )
      }
      else {
        return <span>No upcoming travel</span>;
      }
    }
    else {
      return <span>No upcoming travel</span>;
    }
  },
  // Quick check if the travel items happened in the past or not
  filterDates: function(travelItem, index) {
    if(this.checkDate(travelItem.startDate)) {
      return travelItem;
    }
    else {
      return undefined;
    }
  },
  checkDate: function(date) {
    return Moment(date).isAfter(Moment());
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
