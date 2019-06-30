import React from "react";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Festivals_Images from "./Components/Festivals_Images";
import About from "./Components/About";
import Company from "./Components/Company";
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
      <Router>
        <div className="App">
          <Header linkfun={this.setlink} />
          {/* <Header />
          <Switch>
            <Route exact path="/" Component={About} />
            <Route exact path="/company" Component={Company} />
            <Route exact path="/festival_images" Component={Festivals_Images} />
          </Switch> */}

          <Content linktoRender={this.state.link} linkfun={this.setlink} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
