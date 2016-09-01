import React from "react";
import { render } from "react-dom";

const UserItem = React.createClass({
  render() {
    var details = this.props.details;
    return (
      <h1>Name: {details.firstName}</h1>
    )
  }
});

export default UserItem;
