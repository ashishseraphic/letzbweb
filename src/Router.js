import { HashRouter, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";

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

const Layout = React.lazy(() => import("./layout"));
const DefaultLayout = React.lazy(() => import("./components/DefaultLayout"));

class MainRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                path="/"
                render={props =>
                  localStorage.getItem("token") ? (
                    <DefaultLayout {...props}></DefaultLayout>
                  ) : (
                    <Layout {...props}></Layout>
                  )
                }
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Provider>
    );
  }
}

export default MainRouter;
