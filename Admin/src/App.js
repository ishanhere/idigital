import React from "react";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      link: null
    };
    this.setlink = this.setlink.bind(this);
  }

  setlink(newlink) {
    this.setState({
      link: newlink
    });
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        <Header linkfun={this.setlink} />
        <Content linktoRender={this.state.link} linkfun={this.setlink} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
