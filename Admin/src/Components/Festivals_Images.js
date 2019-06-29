import React, { Component } from "react";
import Festival from "./Festival";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const path = require("path");

class Festivals_Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      festival: "",
      keywords: "",
      render: false,
      show: false,
      logoFile1: null,
      logoFileName1: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.logChange = this.logChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }

  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  selectImages = e => {
    this.setState({ logoFile1: e.target.files[0] });
    var logonamedone =
      JSON.stringify(Date.now()) + "_" + e.target.files[0].name;
    this.setState({ logoFileName1: logonamedone });
    // alert(this.state.logoFile);
    // alert(this.state.logoFileName);
  };
  uploadImage = () => {
    const fd = new FormData();
    fd.append("myfile", this.state.logoFile1, this.state.logoFileName1);
    axios
      .post("http://localhost:5000/uploadfestivaldisplayimage", fd)
      .then(res => console.log(res))
      .catch(e => console.log(e));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.handleClose();
    this.uploadImage();
    var data = {
      festival: this.state.festival,
      keywords: this.state.keywords,
      logoFile: this.state.logoFileName1
    };
    console.log(data);
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
      })
      .then(function(body) {
        if (body === "success") {
          alert("added");
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <Button variant="danger" onClick={this.handleShow}>
            Add festival
          </Button>
        </div>

        <form
          id="register"
          method="POST"
          encType="multipart/form-data"
          action=""
          onSubmit={this.handleSubmit}
        >
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Festival</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                className="form-control"
                id="festival"
                name="festival"
                placeholder="Add festival"
                onChange={this.logChange}
              />
              <br />
              <textarea
                className="form-control"
                id="keywords"
                name="keywords"
                placeholder="Add keywords related to keywords e.g. #diwali #dipawali"
                onChange={this.logChange}
              />
              <br />
              <input type="file" onChange={this.selectImages} name="myfile" />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button
                type="submit"
                variant="danger"
                onClick={this.handleSubmit}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
        <Festival />
      </div>
    );
  }
}
export default Festivals_Images;
