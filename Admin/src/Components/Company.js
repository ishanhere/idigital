// https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs

import React, { Component } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FormErrors } from "./FormErrors";
import formvalidator from "simple-react-validator";
const path = require("path");

class Company extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCompanies: [],
      data: false,
      company: "",
      pname: "",
      email: "",
      pwd: "",
      cpwd: "",
      address: "",
      tagline: "",
      phone: "",
      logoFile: null,
      logoFileName: null,
      count: 1,
      active: "",
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.printData = this.printData.bind(this);
    this.validator = new formvalidator();
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  componentDidMount() {
    this.printData();
  }

  printData() {
    fetch("http://localhost:5000/list/company")
      .then(response => response.json())
      .then(e => this.setState({ allCompanies: e.express, data: true }));
  }
  logChange = e => {
    // console.log(e.target.files[0]);
    this.setState({ [e.target.name]: e.target.value });
  };

  imgChange = e => {
    this.setState({ logoFile: e.target.files[0] });
    var logoName = path.extname(e.target.files[0].name);
    var logonamedone = JSON.stringify(Date.now()) + logoName;
    this.setState({ logoFileName: logonamedone });
  };

  uploadImage = () => {
    const fd = new FormData();
    console.log(this.state.logoFile);
    console.log(this.state.logoFileName);
    fd.append("myfile", this.state.logoFile, this.state.logoFileName);
    console.log(fd);

    axios
      .post("http://localhost:5000/upload", fd)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  handleSearch = e => {
    // console.log(e.target.value);
    var data = {
      keyword: e.target.value
    };

    fetch("http://localhost:5000/search/company", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(e => this.setState({ allCompanies: e.express, data: true }));
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
    } else {
      this.handleClose();
      this.uploadImage();
      // if (formValid(this.state))
      var data = {
        company: this.state.company,
        pname: this.state.pname,
        email: this.state.email,
        pwd: this.state.pwd,
        cpwd: this.state.cpwd,
        address: this.state.address,
        tagline: this.state.tagline,
        phone: this.state.phone,
        logoFile: this.state.logoFileName
      };

      fetch("http://localhost:5000/add/company", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          // console.log("Hello");
          fetch("http://localhost:5000/list/company")
            .then(response => response.json())
            .then(e => this.setState({ allCompanies: e.express, data: true }));
          if (response.status >= 400) {
            throw new Error("Bad Response from server");
          }

          return response.json();
        })
        .then(function(data) {
          // console.log(data);
          // this.printData();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };

  logChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleActivated(e, id) {
    const comid = id;
    var data = {
      comid: id
    };

    let p = this.state.allCompanies.map(e => {
      if (e.cid === id) e.is_active = 1 - e.is_active;
      return e;
    });
    this.setState({ allCompanies: p });

    fetch("http://localhost:5000/edit/company", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad Response from server");
        }
        return response.json();
      })
      .then(() => {
        fetch("http://localhost:5000/list/company")
          .then(response => response.json())
          .then(e => this.setState({ allCompanies: e.express, data: true }));
      })
      .catch(function(err) {
        console.log(err);
      });

    // this.setState({  });
  }

  //

  render() {
    let i = 1;
    const mystyle = {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 0,
      marginBottom: 0,
      width: 250
    };
    var istyle = {
      color: "black"
    };

    return (
      <div>
        <form
          id="register"
          method="post"
          encType="multipart/form-data"
          action=""
        >
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="modal-body">
                <p class="statusMsg" />
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Company</label>

                      <input
                        type="text"
                        class="form-control"
                        id="cname"
                        name="company"
                        placeholder="Enter Company"
                        onChange={this.logChange}
                        value={this.state.company}
                        onBlur={() => {
                          this.validator.showMessageFor("company");
                        }}
                        style={istyle}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "company",
                          this.state.company,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Contact Person</label>
                      <input
                        type="text"
                        class="form-control"
                        style={istyle}
                        id="pname"
                        name="pname"
                        placeholder="Enter Person Name"
                        onChange={this.logChange}
                        value={this.state.pname}
                        onBlur={() => this.validator.showMessageFor("pname")}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "pname",
                          this.state.pname,
                          "required|alpha_space"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Email</label>

                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    style={istyle}
                    onChange={this.logChange}
                    value={this.state.email}
                    onBlur={() => this.validator.showMessageFor("email")}
                  />
                  <span style={{ color: "red" }}>
                    {this.validator.message(
                      "email",
                      this.state.email,
                      "required|email"
                    )}
                  </span>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Password</label>

                      <input
                        type="password"
                        class="form-control"
                        style={istyle}
                        id="pwd"
                        name="pwd"
                        placeholder="Enter Password"
                        onChange={this.logChange}
                        value={this.state.pwd}
                        onBlur={() => this.validator.showMessageFor("pwd")}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "pwd",
                          this.state.pwd,
                          "required|min:8|max:120"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Confirm Password</label>

                      <input
                        type="password"
                        class="form-control"
                        id="cpwd"
                        name="cpwd"
                        style={istyle}
                        placeholder="Enter Confirm Password"
                        onChange={this.logChange}
                        value={this.state.cpwd}
                        onBlur={() => this.validator.showMessageFor("cpwd")}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "cpwd",
                          this.state.cpwd,
                          "required|min:8|max:120"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Address</label>

                  <input
                    type="text"
                    class="form-control"
                    id="add"
                    name="address"
                    placeholder="Enter Company Address"
                    onChange={this.logChange}
                    value={this.state.address}
                    style={istyle}
                    onBlur={() => this.validator.showMessageFor("address")}
                  />
                  <span style={{ color: "red" }}>
                    {this.validator.message(
                      "address",
                      this.state.address,
                      "required|alpha_num_dash_space"
                    )}
                  </span>
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>TagLine</label>

                      <input
                        type="text"
                        class="form-control"
                        id="tagline"
                        name="tagline"
                        placeholder="Enter Company Tagline"
                        onChange={this.logChange}
                        value={this.state.tagline}
                        style={istyle}
                        onBlur={() => this.validator.showMessageFor("tagline")}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "tagline",
                          this.state.tagline,
                          "required|alpha_num_dash_space"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Phone Number</label>

                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter Phone"
                        onChange={this.logChange}
                        value={this.state.phone}
                        style={istyle}
                        onBlur={() => this.validator.showMessageFor("phone")}
                      />
                      <span style={{ color: "red" }}>
                        {this.validator.message(
                          "phone",
                          this.state.phone,
                          "required|phone"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-5">
                    <div class="form-group">
                      <label class="control-label">Logo </label>
                      <div class="btn btn-default btn-file">
                        <i class="fa fa-folder-open" />
                        &nbsp;
                        <span class="hidden-xs">Browse Logo</span>
                        <input
                          type="file"
                          onChange={this.imgChange}
                          name="myfile"
                        />
                        <span style={{ color: "red" }}>
                          {this.validator.message(
                            "logoFileName",
                            this.state.logoFileName,
                            "required"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={this.handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>

        <center>
          <input
            type="text"
            name="search"
            placeholder="Enter Keywords Here to Search"
            className="form-control w-50"
            onChange={this.handleSearch}
          />
          <br />
          <Button variant="danger" onClick={this.handleShow}>
            ADD COMPANY
          </Button>
        </center>
        <br />

        <div className="panel panel-default p50 uth-panel">
          <table
            className="table w-75 table-hover"
            style={{
              flex: 0.8,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 0,
              marginBottom: 0
            }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Email</th>
                <th>Tagline</th>
                <th>Person</th>
                <th>Phone number</th>
                <th>Address</th>
                <th>Logo</th>
                <th>Activated</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allCompanies.map(com => (
                <tr onClick={() => this.props.linkfun("editor")} key={com.cid}>
                  <td>
                    <b>{i++}</b>
                  </td>
                  <td>{com.cname} </td>
                  <td>{com.email}</td>
                  <td>{com.tagline}</td>
                  <td>{com.personname}</td>
                  <td>{com.phone}</td>
                  <td>{com.address}</td>
                  <td>
                    <img
                      src={"http://localhost:3000/files/" + com.logo}
                      style={{ height: 50, width: 50 }}
                    />
                  </td>
                  <td>
                    <a>
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="active"
                          checked={this.state.checked}
                          onChange={e => this.handleActivated(e, com.cid)}
                          checked={com.is_active == 1 ? "true" : ""}
                          // onChange={console.log("HEllo")}
                        />
                        <span className="slider round" />
                      </label>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Company;
