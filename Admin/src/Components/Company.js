// https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs

import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormErrors } from "./FormErrors";
const path = require("path");

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);

//     Object.values(rest).forEach(val => {
//       val === null && (valid = false);
//     });
//     return valid;
//   });
// };

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);

//     Object.values(rest).forEach(val => {
//       val === null && (valid = false);
//     });
//     return valid;
//   });
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
      show: false,
      formErrors: {
        company: "",
        pname: "",
        email: "",
        pwd: "",
        cpwd: "",
        address: "",
        tagline: "",
        phone: "",
        logoFile: null,
        logoFileName: null
      },
      formValid: false,
      emailValid: false,
      companyValid: false,
      personValid: false,
      passwordValid: false,
      confirmpasswordValid: false,
      phoneValid: false,
      addressValid: false,
      tagLine: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.printData = this.printData.bind(this);
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
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.validateField(e.target.name, e.target.value);
    });
  };

  validateField(fieldname, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let companyValid = this.state.companyValid;
    let phoneValid = this.state.phoneValid;
    let taglineValid = this.state.taglineValid;
    let addressValid = this.state.addressValid;
    let confirmpasswordValid = this.state.confirmpasswordValid;
    let personValid = this.state.personValid;

    switch (fieldname) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;

      case "company":
        companyValid = value.length >= 6;
        fieldValidationErrors.company = companyValid ? "" : " is too short";
        break;

      case "pname":
        personValid = value.length >= 6;
        fieldValidationErrors.pname = personValid ? "" : " is too short";
        break;

      case "pwd":
        passwordValid = value.length >= 8;
        fieldValidationErrors.pwd = passwordValid ? "" : " is too short";
        break;

      case "cpwd":
        confirmpasswordValid = value.length >= 8;
        fieldValidationErrors.cpwd = confirmpasswordValid
          ? ""
          : " is too short";
        break;

      case "address":
        addressValid = value.length >= 10;
        fieldValidationErrors.address = addressValid ? "" : " is too short";
        break;

      case "tagline":
        taglineValid = value.length >= 5;
        fieldValidationErrors.tagline = taglineValid ? "" : " is too short";
        break;

      case "phone":
        phoneValid = value.length === 10;
        fieldValidationErrors.phone = phoneValid ? "" : " is too short";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        taglineValid: taglineValid,
        phoneValid: phoneValid,
        companyValid: companyValid,
        confirmpasswordValid: confirmpasswordValid,
        addressValid: addressValid,
        personValid: personValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.taglineValid &&
        this.state.phoneValid &&
        this.state.companyValid &&
        this.confirmpasswordValid &&
        this.state.addressValid &&
        this.state.personValid
    });
  }
  imgChange = e => {
    this.setState({ logoFile: e.target.files[0] });
    var logoName = path.extname(e.target.files[0].name);
    var logonamedone = JSON.stringify(Date.now()) + logoName;
    this.setState({ logoFileName: logonamedone });
    // console.log(e.target.files[0]);
    console.log(logonamedone);
  };

  uploadImage = () => {
    const fd = new FormData();
    fd.append("myfile", this.state.logoFile, this.state.logoFileName);
    axios
      .post("http://localhost:5000/upload", fd)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };

  handleSubmit = e => {
    e.preventDefault();
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
        console.log("Hello");
        fetch("http://localhost:5000/list/company")
          .then(response => response.json())
          .then(e => this.setState({ allCompanies: e.express, data: true }));
        if (response.status >= 400) {
          throw new Error("Bad Response from server");
        }

        return response.json();
      })
      // .then(function(data) {
      //   console.log(data);

      //   this.printData();
      // })
      .catch(function(err) {
        console.log(err);
      });
  };

  logChange(e) {
    // const [name, value] = e.target;
    // let formErrors = this.state.formErrors;
    // switch (name) {
    //   case "company":
    //     formErrors.company =
    //       value.length < 20 && value.length > 0
    //         ? "Minimum 20 character Required"
    //         : "";
    //     break;

    //   case "pname":
    //     formErrors.pname =
    //       value.length < 20 && value.length > 0
    //         ? "Minimum 20 character Required"
    //         : "";
    //     break;

    //   case "email":
    //     formErrors.email =
    //       value.length < 20 && value.length > 0
    //         ? "Minimum 20 character Required"
    //         : "";
    //     break;

    //   case "pwd":
    //     formErrors.pwd =
    //       value.length < 6 && value.length > 0
    //         ? "Minimum 6 character Required"
    //         : "";
    //     break;

    //   case "cpwd":
    //     formErrors.cpwd =
    //       value.length < 6 && value.length > 0
    //         ? "Minimum 6 character Required"
    //         : "";
    //     break;

    //   case "address":
    //     formErrors.address =
    //       value.length < 20 && value.length > 0 ? " 20 character Required" : "";
    //     break;

    //   case "tagline":
    //     formErrors.tagline =
    //       value.length < 20 && value.length > 0 ? "20 character Required" : "";
    //     break;

    //   case "phone":
    //     formErrors.phone = value.length == 20 ? "10 Digits Required" : "";
    //     break;

    //   default:
    //     break;
    // }
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

    console.log(data);
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
        console.log("heello");
        fetch("http://localhost:5000/list/company")
          .then(response => response.json())
          .then(e => this.setState({ allCompanies: e.express, data: true }));
        // console.log(data);

        // if (data === "success") {
        //   // e.target.checked : !e.target.checked;
        //   // this.setState({ msg: "Company Edited", active: !e.target.checked });
        // }
      })
      .catch(function(err) {
        console.log(err);
      });

    // this.setState({  });
  }

  // handleCheckboxChange = (event, cid) => {
  //   // console.log("Hello" + cid);
  // };

  render() {
    let i = 1;
    const mystyle = {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 0,
      marginBottom: 0,
      width: 250
    };

    return (
      <body>
        <form
          id="register"
          method="post"
          encType="multipart/form-data"
          action=""
          onSubmit={this.handleSubmit}
        >
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormErrors formErrors={this.state.formErrors} />
              {/* <!-- Modal Body --> */}
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
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Contact Person</label>

                      <input
                        type="text"
                        class="form-control"
                        id="pname"
                        name="pname"
                        placeholder="Enter Person Name"
                        onChange={this.logChange}
                      />
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
                    onChange={this.logChange}
                  />
                </div>

                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label>Password</label>

                      <input
                        type="password"
                        class="form-control"
                        id="pwd"
                        name="pwd"
                        placeholder="Enter Password"
                        onChange={this.logChange}
                      />
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
                        placeholder="Enter Confirm Password"
                        onChange={this.logChange}
                      />
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
                  />
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
                      />
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
                      />
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Modal Footer --> */}
              {/* <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-default submitBtn">
                  SUBMIT
                </button>
              </div> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={this.handleSubmit}
                disabled={!this.state.formValid}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
        <h1 align="center"> COMPANY </h1>
        <center>
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
                <tr>
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
                      <label class="switch">
                        <input
                          type="checkbox"
                          name="active"
                          checked={this.state.checked}
                          onChange={e => this.handleActivated(e, com.cid)}
                          checked={com.is_active == 1 ? "true" : ""}
                          // onChange={console.log("HEllo")}
                        />
                        <span class="slider round" />
                      </label>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    );
  }
}

export default Company;
