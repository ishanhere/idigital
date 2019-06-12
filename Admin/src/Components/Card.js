import React, { Component } from "react";

export default class Card extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      festivalid: "",
      show: false,
      festivalimages: [],
      data: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(e, fid) {
    // console.log(h);
    this.setState({ show: true, festivalid: fid });
    fetch("http://localhost:5000/api/showimagesbyfestival")
      .then(response => response.json())
      .then(e => this.setState({ festivalimages: e.express, data: true }));
  }
  render() {
    // console.log(this.props.item);
    return (
      <div className="col-xl-4 col-md-4">
        <div className="ministry">
          <div className="ministry_image">
            <img src="images/ministries_1.jpg" />
          </div>
          <a
            href="#"
            title="click to add/show images."
            onClick={e => this.handleShow(e, this.props.item.fid)}
            data-toggle="modal"
            data-target="#modalupload"
            data-backdrop="static"
            data-keyboard="false"
          >
            {" "}
            <div className="ministry_title">{this.props.item.fname}</div>
            {/* start */}
            <div
              class="modal fade"
              id="modalupload"
              role="dialog"
              show={this.state.show}
            >
              <div class="modal-dialog modal-lg">
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
                    // onSubmit={this.handleSubmit}
                  >
                    <div class="modal-body">
                      <p class="statusMsg" />
                      <div class="row">
                        <div class="col-sm-12" />
                      </div>

                      <div class="row">
                        <div class="col-sm-12" />
                      </div>
                    </div>

                    {/* <!-- Modal Footer --> */}
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-default"
                        data-dismiss="modal"
                        onClick={this.handleClose}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        class="btn btn-danger submitBtn"
                        onClick={this.handleClose}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* end */}
          </a>
        </div>
      </div>
    );
  }
}
