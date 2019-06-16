import React, { Component } from "react";

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
      count: 1,
      active: ""
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/list/company")
      .then(response => response.json())
      .then(e => this.setState({ allCompanies: e.express, data: true }));
  }

  logChange = e => {
    // console.log(e.target.files[0]);
    this.setState({ [e.target.name]: e.target.value });
  };

  imgChange = e => {
    this.setState({ logoFile: e.target.files[0].name });
    // console.log(e.target.files[0]);
  };
  handleSubmit = e => {
    e.preventDefault();
    var data = {
      company: this.state.company,
      pname: this.state.pname,
      email: this.state.email,
      pwd: this.state.pwd,
      cpwd: this.state.cpwd,
      address: this.state.address,
      tagline: this.state.tagline,
      phone: this.state.phone,
      logoFile: this.state.logoFile
    };

    fetch("http://localhost:5000/add/company", {
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
      .then(function(data) {
        console.log(data);
        if (data == "success") {
          this.setState({ msg: "Company Added" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  logChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleActivated(e, id) {
    const comid = id;
    var data = {
      comid: id
    };

    // let p = this.state.allCompanies.map(e => {
    //   if (e.cid === id) e.is_active = 1 - e.is_active;
    //   return e;
    // });
    // this.setState({ allCompanies: p });

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
    const mystyle = {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 0,
      marginBottom: 0,
      width: 250
    };

    return (
      <div>
        <h1 align="center"> COMPANY </h1>
        <center>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target="#modalForm"
            data-backdrop="static"
            data-keyboard="false"
          >
            {" "}
            ADD COMPANY
          </button>
        </center>
        <br />
        <div className="panel panel-default p50 uth-panel">
          <table
            className="table table-hover"
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
                <th>Activated</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allCompanies.map(com => (
                <tr onClick={() => this.props.linkfun("editor")} key={com.cid}>
                  <td>
                    <b>{this.state.count}</b>
                  </td>
                  <td>{com.cname} </td>
                  <td>{com.email}</td>
                  <td>{com.tagline}</td>
                  <td>{com.personname}</td>
                  <td>{com.phone}</td>
                  <td>{com.address}</td>
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

        <div className="modal fade" id="modalForm" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                  <span className="sr-only">Close</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Sign Up
                </h4>
              </div>

              <form
                id="register"
                method="post"
                encType="multipart/form-data"
                action=""
                onSubmit={this.handleSubmit}
              >
                {/* <!-- Modal Body --> */}

                <div className="modal-body">
                  <p className="statusMsg" />
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Company</label>

                        <input
                          type="text"
                          className="form-control"
                          id="cname"
                          name="company"
                          placeholder="Enter Company"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Contact Person</label>

                        <input
                          type="text"
                          className="form-control"
                          id="pname"
                          name="pname"
                          placeholder="Enter Person Name"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={this.logChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>

                        <input
                          type="password"
                          className="form-control"
                          id="pwd"
                          name="pwd"
                          placeholder="Enter Password"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirm Password</label>

                        <input
                          type="password"
                          className="form-control"
                          id="cpwd"
                          name="cpwd"
                          placeholder="Enter Confirm Password"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>

                    <input
                      type="text"
                      className="form-control"
                      id="add"
                      name="address"
                      placeholder="Enter Company Address"
                      onChange={this.logChange}
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>TagLine</label>

                        <input
                          type="text"
                          className="form-control"
                          id="tagline"
                          name="tagline"
                          placeholder="Enter Company Tagline"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Phone Number</label>

                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Enter Phone"
                          onChange={this.logChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-5">
                      <div className="form-group">
                        <label className="control-label">Logo </label>
                        <div className="btn btn-default btn-file">
                          <i className="fa fa-folder-open" />
                          &nbsp;
                          <span className="hidden-xs">Browse Logo</span>
                          <input
                            id="pic"
                            name="pic"
                            type="file"
                            onChange={this.imgChange}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Modal Footer --> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-default submitBtn">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Company;
