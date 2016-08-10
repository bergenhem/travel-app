import React from "react";
import { render } from "react-dom";

import { NotificationContainer, NotificationManager } from 'react-notifications';

import Rebase from "re-base";
import Firebase from "firebase";

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
    var that = this;
    database.ref("/travelItems").once("value", function(dataSnapShot) {
      console.log("Read data at load");
      var loadedTravelItems = dataSnapShot.val();
      that.setState({
        travelItems: loadedTravelItems
      });
    }, function(error) {
      console.log("Error retrieving data at load");
      console.log(error);
      this.createNotification("error", error, "Error", 3000);
    });
  },
  createNotification: function(type, message, title, timeout) {
      switch(type) {
        case "info":
          NotificationManager.info(message, title, timeout);
          break;
        case "success":
          NotificationManager.success(message, title, timeout)
          break;
        case "warning":
          NotificationManager.warning(message, title, timeout)
          break;
        case "error":
          NotificationManager.error(message, title, timeout);
          break;
      }
  },
  registerUser: function(email, password) {
    var that = this;
    console.log("Register User");
    // database.createUser({
    //   email: email,
    //   password: password
    // }, function(error, userData) {
    //   if(error) {
    //     switch(error.code) {
    //       case "EMAIL_TAKEN":
    //         that.createNotification("error", "The email provided is already in use.", "Error Creating User", 3000);
    //         break;
    //       case "INVALID_EMAIL":
    //         that.createNotification("error", "The specified email is not a valid email.", "Error Creating User", 3000);
    //         break;
    //       default:
    //         that.createNotification("error", "An generic error occured when creating a user.", "Error Creating User", 3000);
    //     }
    //   }
    //   else {
    //     console.log("Added user account with uid: ", userData.uid);
    //     console.log(userData);
    //   }
    // });
  },
  addTravelItem: function(travelItem) {
    // Use firebase to add an unique key
    var newPostKey = database.ref("/travelItems").push().key;
    var newItem = {};

    // Update the temporary item we added to Firebase
    newItem["/travelItems/" + newPostKey] = travelItem;
    database.ref().update(newItem, this.updatePromise);

    // Use the above key to create unique entries in our state
    this.state.travelItems[newPostKey] = travelItem;
    this.setState({ travelItems: this.state.travelItems });
  },
  updatePromise: function(error) {
    if(error) {
      console.log("Error when updating, saving to localStorage");
      console.log(error);
      this.createNotification("error", error, "Error", 3000);
    }
    else {
      console.log("Successfully added item");
      this.createNotification("success", "Item was added!", "Success!", 2000);
    }
  },
  // <Travel addTravelItem={ this.addTravelItem } registerUser={ this.registerUser } />
  render() {
    var that = this;
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
      var pathName = child.props.location.pathname;
      var childWithCorrectProps = {};
      switch(pathName) {
        case "/login":
          break;
        case "/register":
          childWithCorrectProps = React.cloneElement(child, {
            registerUser: that.registerUser
          });
          break;
        case "/recovery":
          asd
          break;
        default:
          childWithCorrectProps = React.cloneElement(child, {
            addTravelItem: that.addTravelItem
          });
      }
      return childWithCorrectProps
    });
    return (
      <div>
        { childrenWithProps }
        <NotificationContainer />
      </div>
    );
  }
});

export default App;
