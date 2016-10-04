import React from "react";
import { render } from "react-dom";
import UserItem from "./UserItem";

const List = React.createClass({
  renderItem: function(key) {
    return(
      <UserItem key={key} details={ this.props.users[key] }/>
    )
  },
  render() {
    return (
      <div className="overallArea">
        <div className="overallHeader">
          <h1>Upcoming Travel</h1>
        </div>
        <div className="overallContentArea">
          <ul className="userTravelDisplay">
            { Object.keys(this.props.users).map(this.renderItem) }
          </ul>
        </div>
      </div>
    )
  }
});

export default List;
