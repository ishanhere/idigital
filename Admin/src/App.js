import React from "react";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import { threadId } from "worker_threads";
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
    this.setCompany = this.setCompany.bind(this);
    this.setlink = this.setlink.bind(this);
  }
  setCompany(cid, cname, email, tagline, personname, phone, address, logo) {
    // alert(cid);
    this.setState({
      link: "editor",
      cid: cid,
      cname: cname,
      email: email,
      tagline: tagline,
      personname: personname,
      phone: phone,
      address: address,
      logo: logo
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
          linkfun={this.setlink}
          linkSet={this.setCompany}
          cid={this.state.cid}
          cname={this.state.cname}
          email={this.state.email}
          tagline={this.state.email}
          personname={this.state.personname}
          phone={this.state.phone}
          address={this.state.address}
          logo={this.state.logo}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
