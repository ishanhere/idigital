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
      link: null,
      cid: 0,
      cname: "",
      email: "",
      tagline: "",
      personname: "",
      phone: "",
      address: "",
      logo: ""
    };
    this.setlink = this.setlink.bind(this);
    this.setcompany = this.setcompany.bind(this);
  }

  setcompany(cid, cname, email, tagline, personname, phone, address, logo) {
    // alert(com);
    this.setState({
      cid: cid,
      cname: cname,
      email: email,
      tagline: tagline,
      personname: personname,
      phone: phone,
      address: address,
      logo: logo,
      link: "editor"
    });
    this.forceUpdate();
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
        <Content
          linktoRender={this.state.link}
          CompanyToDisplay={this.setcompany}
          cid={this.state.cid}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
