import React, { Component } from "react";
import { throws } from "assert";
class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      pname: "",
      email: "",
      pwd: "",
      cpwd: "",
      address: "",
      tagline: "",
      phone: "",
      logoFile: null
    };
  }
  logChange = e => {
    // console.log(e.target.files[0]);
    this.setState({ [e.target.name]: e.target.value });
  };

  imgChange = e => {
    this.setState({ logoFile: e.target.files[0] });
    console.log("dd");
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
      phone: this.state.phone
    };
    console.log(data);
    fetch("http://localhost:5000/new/company", {
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
          alert("added");
          //   this.setState({ msg: "Company Added" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    const mystyle = {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 0,
      marginBottom: 0,
      width: 250
    };

    return (
      <body>
        <h1 align="center"> Comapny</h1>
        <center>
          <button
            type="button"
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#modalForm"
            data-backdrop="static"
            data-keyboard="false"
          >
            {" "}
            Add Comapny
          </button>
        </center>

        <div class="modal fade" id="modalForm" role="dialog">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              {/* <!-- Modal Header --> */}
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
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
                <div class="modal-footer">
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
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
      </body>
    );
  }
}

export default Company;
