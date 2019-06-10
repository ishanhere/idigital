import React, { Component } from "react";

import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default class Header extends Component {
  state = {
    selectedlink: ""
  };
  setchildlink() {
    // alert(newlink);
    // this.setState({ selectedlink: newlink });
  }
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

                          <li>
                            <button
                              name="Companies"
                              onClick={() => this.props.linkfun("Companies")}
                              // onClick={this.setchildlink.bind(this, name)}
                            >
                              Companies
                            </button>
                          </li>
                          <li>
                            <button
                              name="Festival_Images"
                              onClick={() =>
                                this.props.linkfun("Festival_Images")
                              }

                              // onClick={this.setchildlink.bind(this, name)}
                            >
                              Festival/Images
                            </button>
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
// Header.propTypes = {
//   linkfun: React.PropTypes.func
// };
