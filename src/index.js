import React from "react";
import ReactDOM from "react-dom";
import LocaleProvider from "antd/lib/locale-provider";
import enUS from "antd/lib/locale-provider/en_US";
import { isLoggedIn } from "./Auth";
import fetchIntercept from "fetch-intercept";
import * as pages from "./pages";
import "./index.css";
import { message } from "antd";
import Header from '../src/components/Header';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export const USERS = "/users";
export const TAGS = "/tags";
export const ACCOUNT = '/account';

const PrivateRoute = ({ component: Component, child: Child, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} child={Child} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

fetchIntercept.register({
  response: function(response) {
    if (response.status === 401) {
      window.location.href = "/login";
    }
    return response;
  }
});

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={pages.LoginPage}
        />
        <Route path="/login" component={pages.LoginPage} />
        <PrivateRoute
          exact
          path={USERS}
          component={Header}
          child={pages.UsersPage}
        />
        <PrivateRoute
          exact
          path={TAGS}
          component={Header}
          child={pages.TagsPage}
        />
        <PrivateRoute
          exact
          path={ACCOUNT}
          component={Header}
          child={pages.AccountPage}
        />
      </Switch>
    </Router>
  </LocaleProvider>,
  document.getElementById("root")
);
