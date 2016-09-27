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
      <ul>
        { Object.keys(this.props.users).map(this.renderItem) }
      </ul>
    )
  }
});

export default List;
