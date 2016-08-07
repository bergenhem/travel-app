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
    // base.syncState("/travelItems", {
    //   context: this,
    //   state: "travelItems"
    // });
    var localStorageRef = localStorage.getItem("travelItems");
    if(localStorageRef) {
      this.setState({
        travelItems: JSON.parse(localStorageRef)
      });
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    localStorage.setItem("travelItems", JSON.stringify(nextState));
  },
  addTravelItem: function(travelItem) {
    var newPostKey = database.ref("/travelItems").push().key;
    var newItem = {};
    newItem["/travelItems/" + newPostKey] = travelItem;
    var test = database.ref().update(newItem);
    console.log("addTravelItem");
    console.log(test);
//     // Get a key for a new Post.
// var newPostKey = firebase.database().ref().child('posts').push().key;
//
// // Write the new post's data simultaneously in the posts list and the user's post list.
// var updates = {};
// updates['/posts/' + newPostKey] = postData;
// updates['/user-posts/' + uid + '/' + newPostKey] = postData;
//
// return firebase.database().ref().update(updates);
    //var timestamp = (new Date()).getTime();
    //this.state.travelItems["travel-item-" + timestamp] = travelItem;
    //this.setState({ travelItems : this.state.travelItems });
  },
  render() {
    return (
      <Travel addTravelItem={ this.addTravelItem } />
    );
  }
});

export default App;
