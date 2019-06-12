import React, { Component } from "react";
import Festival from "./Festival";
class Festivals_Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      festival: "",
      keywords: "",
      festivaltoshowimages: null
    };
    // this.setfestival = this.setfestival.bind(this);
  }

  // setfestival = newfestival => {
  //   this.setState({
  //     festivaltoshowimages: newfestival
  //   });
  //   alert(newfestival);
  //   this.forceUpdate();
  // };

  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    // alert("here");
    var data = {
      festival: this.state.festival,
      keywords: this.state.keywords
    };
    // alert(data.festival);
    // console.log(data);
    fetch("http://localhost:5000/api/addfestivals", {
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
        if (data === "success") {
          alert("added");
          //   this.setState({ msg: "Festival Added" });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <body>
        <center>
          {/* INM 10-06-2019 */}
          {/* modal for add Festivals start */}
          <div>
            <button
              type="button"
              class="btn btn-danger"
              data-toggle="modal"
              data-target="#modalForm"
              data-backdrop="static"
              data-keyboard="false"
            >
              Add Festival / Images
            </button>
          </div>
          <div class="modal fade" id="modalForm" role="dialog">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">
                {/* <!-- Modal Header --> */}
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                  </button>
                </div>

                <form
                  id="register"
                  method="post"
                  encType="multipart/form-data"
                  action=""
                  onSubmit={this.handleSubmit}
                >
                  <div class="modal-body">
                    <p class="statusMsg" />
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label>Festival-name</label>

                          <input
                            type="text"
                            class="form-control"
                            id="festival"
                            name="festival"
                            placeholder="Add festival"
                            onChange={this.logChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label>keywords</label>

                          <textarea
                            class="form-control"
                            id="keywords"
                            name="keywords"
                            placeholder="Add keywords related to keywords e.g. #diwali #dipawali"
                            onChange={this.logChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group">
                          <label>Drag images related to festivals</label>
                          <input type="file" id="file" name="file[]" multiple />
                        </div>
                      </div>
                    </div> */}
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
                    <button type="submit" class="btn btn-danger submitBtn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* modal for add Festivals end */}
        </center>
        <Festival />
        {/* INM 11-06-2019 */}
        {/* modal for add/show Festivals_Images start */}
        <h3>{this.state.festivaltoshowimages}</h3>;
        {/* modal for add/show Festivals_Images end */}
      </body>
    );
  }
}
export default Festivals_Images;
