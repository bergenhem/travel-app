import React from "react";
import { render } from "react-dom";

import { NotificationContainer, NotificationManager } from 'react-notifications';

import Firebase from "firebase";
import Auth from "./helpers/auth";

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
      var loadedTravelItems = dataSnapShot.val();
      that.setState({
        travelItems: loadedTravelItems
      });
    }, function(error) {
      this.createNotification("error", error, "Error", 3000);
    });
  },
  // Abstraction to create popup notifications of various kinds
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
  registerUser: function(email, password, firstName, lastName) {
    var that = this;
    Firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) { // successfully created a user, now let's update the "user" data item
        var uid = user.uid;
        database.ref("/user/" + uid).set({
          uid: uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName
        });
        // navigate to the main page
        that.props.router.push("/");
      }).catch(function(error) {
        that.createNotification("error", error.message, "Registration Error", 4000);
      });
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
      this.createNotification("error", error, "Error", 3000);
    }
    else {
      this.createNotification("success", "Item was added!", "Success!", 2000);
    }
  },
  render() {
    var that = this;
    /*
      The following allows us to check the child view that needs to be rendered and then applies
      the proper props to that child. This is to prevent registration-specific functionality to be
      available in the area where we add travel and vice versa etc.
    */
    var childrenWithProps = React.Children.map(this.props.children, function(child) {
      var pathName = child.props.location.pathname;
      var childWithCorrectProps = {};
      switch(pathName) {
        case "/login":
          childWithCorrectProps = React.cloneElement(child, {
            createNotification: that.createNotification
          });
          break;
        case "/register":
          childWithCorrectProps = React.cloneElement(child, {
            registerUser: that.registerUser,
            createNotification: that.createNotification
          });
          break;
        case "/recovery":
          childWithCorrectProps = React.cloneElement(child);
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
