import React, { Component } from "react";
import Content from "./Content";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default class Header extends Component {
  render() {
    var style = {
      height: 60
    };
    var imgstyle = {
      height: 25,
      background: "rgb(255,0,0)",
      marginLeft: 5
    };
    return (
      <Router>
        <header class="header">
          {/* <!-- Header Content --> */}

          <div class="header_container">
            <div class="container">
              <div class="row">
                <div class="col">
                  <div
                    class="header_content d-flex flex-row align-items-center justify-content-start"
                    style={style}
                  >
                    {/* <!-- Logo --> */}
                    <div class="logo_container">
                      <div class="logo">
                        <a href="#">
                          <span>iDigital</span>
                          <img src="images/icon1.png" alt="" style={imgstyle} />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Navigation and Search --> */}
                    <div class="header_nav_container ml-auto">
                      <nav class="main_nav">
                        <ul>
                          <li class="active">
                            <a href="/">Home</a>
                          </li>

                          <li class="">
                            <a
                              href="#"
                              name="Companies"
                              onClick={() => this.props.linkfun("Companies")}
                            >
                              Companies
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              name="Festival / Images"
                              onClick={() =>
                                this.props.linkfun("Festivals_Images")
                              }
                            >
                              Festival / Images
                            </a>
                          </li>
                          <li>
                            <a href="contact.html">Contact</a>
                          </li>
                          <li>
                            <a href="/login">Login / Signup</a>
                          </li>
                        </ul>
                        {/* <Route
                          path="/companies"
                          exact
                          strict
                          render={() => {
                            return <Company />;
                          }}
                        /> */}
                      </nav>
                    </div>

                    {/* <!-- Hamburger --> */}

                    <div class="hamburger ml-auto">
                      <i class="fa fa-bars" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Router>
    );
  }
}
