import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export default class Header extends Component {
  state = {
    selectedlink: ""
  };
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
        <header className="header">
          {/* <!-- Header Content --> */}

          <div className="header_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div
                    className="header_content d-flex flex-row align-items-center justify-content-start"
                    style={style}
                  >
                    {/* <!-- Logo --> */}
                    <div className="logo_container">
                      <div className="logo">
                        <a href="#">
                          <span>iDigital</span>
                          <img src="images/icon1.png" alt="" style={imgstyle} />
                        </a>
                      </div>
                    </div>

                    {/* <!-- Navigation and Search --> */}
                    <div className="header_nav_container ml-auto">
                      <nav className="main_nav">
                        <ul>
                          <li className="active">
                            <a href="/">Home</a>
                          </li>

                          <li className="">
                            <Link to="/company" className="nav-link">
                              {/* <a
                              href="#"
                              name="Companies"
                              onClick={() => this.props.linkfun("Companies")}
                            > */}
                              Company
                            </Link>
                            {/* </a> */}
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

                    <div className="hamburger ml-auto">
                      <i className="fa fa-bars" aria-hidden="true" />
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
