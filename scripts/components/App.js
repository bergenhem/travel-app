import React from "react";
import { render } from "react-dom";

import { NotificationContainer, NotificationManager } from 'react-notifications';

import Firebase from "firebase";
import Auth from "./helpers/auth";

var database = Firebase.database();

// Import components
import Travel from "./Travel";
import Header from "./Header";

const App = React.createClass({
  getInitialState: function() {
    return this.state = {
      users: {}
    };
  },
  componentDidMount: function() {
    var that = this;
    database.ref("/users").once("value", function(dataSnapShot) {
      var loadedTravelItems = dataSnapShot.val();
      that.setState({
        users: loadedTravelItems
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
        database.ref("/users/" + uid).set({
          uid: uid,
          email: user.email,
          firstName: firstName,
          lastName: lastName
        })
        .then(function() {
          database.ref("/users/").once("value", function(snapshot) {
            that.setState({
              users: snapshot.val()
            });
            Auth.login(email, password, that.createNotification, that.props.router);
          });
        });
      }).catch(function(error) {
        that.createNotification("error", error.message, "Registration Error", 4000);
      });
  },
  addTravelItem: function(travelItem) {
    // We need the UID for the user in both state and in Firebase
    var currentLoggedUser = Auth.getUser();
    var currentUID = currentLoggedUser.uid;

    var userFromState = this.state.users[currentUID];
    if(userFromState.travelItems === undefined) { // this is just in case this never got added to the item (only applicable to a brand new user)
      userFromState.travelItems = [];
    }
    // update locally, in Firebase, and finally update our state
    userFromState.travelItems.push(travelItem);

    Firebase.database().ref("/users/" + currentUID).update(userFromState, this.updatePromise);

    this.state.users[currentUID] = userFromState;
    this.setState({ users: this.state.users });
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
          childWithCorrectProps = React.cloneElement(child, {
            createNotification: that.createNotification
          });
          break;
        case "/list":
          childWithCorrectProps = React.cloneElement(child, {
            users: that.state.users
          });
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
        <Header />
        { childrenWithProps }
        <NotificationContainer />
      </div>
    );
  }
});

export default App;
