import React from "react";
import { render } from "react-dom";

import Rebase from "re-base";
var base = Rebase.createClass("https://travel-app-1e574.firebaseio.com/");
// Import components
import Travel from "./Travel";

const App = React.createClass({
  getInitialState: function() {
    return this.state = {
      travelItems: {}
    };
  },
  componentDidMount: function() {
    base.syncState("/travelItems", {
      context: this,
      state: "travelItems",
      then: function(e) {
        console.log("then");
        console.log(e);
      }
    });
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
    var timestamp = (new Date()).getTime();
    this.state.travelItems["travel-item-" + timestamp] = travelItem;
    this.setState({ travelItems : this.state.travelItems });
  },
  render() {
    return (
      <Travel addTravelItem={ this.addTravelItem } />
    );
  }
});

export default App;
