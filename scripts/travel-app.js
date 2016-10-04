import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import { createHistory } from "history";

// Import components
import App from "./components/App";
import Login from "./components/Login";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Travel from "./components/Travel";
import List from "./components/List";
import AuthHelper from "./components/helpers/auth";

/*
  Routes
*/
var routes = (
  <Router history={ createHistory() }>
    <Route path="/" component={ App } onEnter={ AuthHelper.requireAuth } >
      <IndexRoute component={ List } />
      <Route path="login" component={ Login } />
      <Route path="recovery" component={ Recovery } />
      <Route path="register" component={ Register } />
      <Route path="list" component={ List } />
      <Route path="add" component={ Travel } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
);

render(routes, document.getElementById("root"));
