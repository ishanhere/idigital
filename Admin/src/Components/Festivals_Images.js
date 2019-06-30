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
      logoFile: null,
      logoFileName: null
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

  handleSearch = e => {
    // console.log(e.target.value);
    var data = {
      keyword1: e.target.value
    };

    fetch("http://localhost:5000/search/festivals", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    // .then(response => response.json())
    // .then(e => this.setState({ allCompanies: e.express, data: true }));
  };

  logChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  selectImages = e => {
    this.setState({ logoFile: e.target.files[0] });
    var logoName = path.extname(e.target.files[0].name);
    var logonamedone = JSON.stringify(Date.now()) + logoName;
    this.setState({ logoFileName: logonamedone });
  };
  uploadImage = () => {
    const fd = new FormData();
    fd.append("myfile", this.state.logoFile, this.state.logoFileName);
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
      logoFile: this.state.logoFileName
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
        {/* <input
          type="text"
          name="festival_search"
          placeholder="Enter Keywords Here to Search the festivals"
          className="form-control w-50"
          onChange={this.handleSearch}
        /> */}

        <br />
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
              <input type="file" onChange={this.selectImages} name="myfile1" />
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
