import React from "react";
import { render } from "react-dom";

import Rebase from "re-base";
import Firebase from "firebase";
//var base = Rebase.createClass("https://travel-app-1e574.firebaseio.com/");

var config = {
  apiKey: "3RjI1jSJ9KXAcNP26NB4i6xgjFcXU9SjoqNHIWcC",
  databaseURL: "https://travel-app-1e574.firebaseio.com/"
};
Firebase.initializeApp(config);
var database = Firebase.database();

// Import components
import Travel from "./Travel";

const App = React.createClass({
  getInitialState: function() {
    return this.state = {
      travelItems: {}
    };
  },
  componentDidMount: function() {
    var localStorageRef = localStorage.getItem("travelItems");
    if(localStorageRef) {
      this.setState({
        travelItems: JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem("travelItems", JSON.stringify(nextState.travelItems));
  },
  addTravelItem: function(travelItem) {
    var newPostKey = database.ref("/travelItems").push().key;
    var newItem = {};
    newItem["/travelItems/" + newPostKey] = travelItem;
    var test = database.ref().update(newItem);
    this.state.travelItems["travel-item-" + newPostKey] = travelItem;
    this.setState({ travelItems: this.state.travelItems });
  },
  render() {
    return (
      <Travel addTravelItem={ this.addTravelItem } />
    );
  }
});

export default App;
