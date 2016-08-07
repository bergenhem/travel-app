import React from "react";
import { render } from "react-dom";
import { Router, Route } from "react-router";
import { createHistory } from "history";

// Import components
import App from "./components/App";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import Register from "./components/Register";

// Check whether or not a user is logged in to redirect to "/login" if needed
function checkLogin(nextState, replace) {
  console.log("Check user");
  console.log("next state");
  console.log(nextState);
  console.log("replace");
  console.log(replace);

  //TODO: Add authentication helpers and route to login if user is not logged in
  // Currently automatically goes to the "Log in" screen for testing
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}
/*
  Routes
*/
var routes = (
  <Router history={ createHistory() }>
    <Route path="/" component={ App } onEnter={ checkLogin } />
    <Route path="/login" component={ Login } />
    <Route path="/recovery" component={ Recovery } />
    <Route path="/register" component={ Register } />
  </Router>
);

render(routes, document.getElementById("root"));
