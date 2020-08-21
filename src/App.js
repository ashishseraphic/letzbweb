import React, { Component } from "react";
import MainRouter from "./Router";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainRouter />
      </div>
    );
  }
}

export default App;
