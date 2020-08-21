import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { Spinner } from "reactstrap";

const loading = () => (
  <div className="overlay-div">
    <Spinner
      style={{
        width: "5rem",
        height: "5rem"
      }}
    />
  </div>
);

const Login = React.lazy(() => import("./components/login"));
const ForgotPassword = React.lazy(() => import("./components/forgotPassword"));

class Layout extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/loginadmin" component={Login} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Redirect from="/" to={"/loginadmin"} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default Layout;
