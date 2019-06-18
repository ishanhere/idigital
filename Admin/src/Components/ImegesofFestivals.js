import React, { Component } from "react";
import Displayfestivalbyimages from "./Displayfestivalbyimages";
import axios from "axios";

export default class ImegesofFestivals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrfestivalimages: [],
      // data: false,
      images: [],
      imageUrls: []
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.selectImages = this.selectImages.bind(this);
    this.showimages = this.showimages.bind(this);
  }
  showimages() {
    var url =
      "http://localhost:5000/api/showimagesbyfestival?id=" +
      this.props.festivalid;
    fetch(url)
      .then(response => response.json())
      .then(e => {
        this.setState({ arrfestivalimages: e.express });
      });
  }
  onSubmitHandler = e => {
    e.preventDefault();
    console.log("onSubmitHandler");
    const fd = new FormData();
    let i = 0;
    for (const file of this.state.imageUrls) {
      fd.append(
        "myfile",
        file,
        JSON.stringify(Date.now()) + this.state.images[i++]
      );
    }
    const url =
      "http://localhost:5000/api/uploadfestivalimages?fid=" +
      this.props.festivalid;
    // this.props.festivalid;
    axios
      .post(url, fd)
      .then(res => {
        // this..value = "";
        // console.log(res);
        // e.target.value = null;
        console.log(res);
        this.showimages();
      })
      .catch(e => console.log(e));
  };
  selectImages = e => {
    console.log("images r changed");
    this.setState({ imageUrls: e.target.files });
    let images = [];
    for (var i = 0; i < e.target.files.length; i++) {
      images.push(JSON.stringify(Date.now()) + e.target.files[i].name);
    }
    this.setState({
      images: images
    });
  };

  componentDidMount() {
    this.showimages();
  }

  render() {
    const festivalimages = this.state.arrfestivalimages.map(item => (
      <Displayfestivalbyimages item={item} />
    ));
    return (
      <div>
        <button
          onClick={() => {
            this.props.changecomponent(1);
          }}
        >
          Back to festival
        </button>
        <form id="register" method="POST" encType="multipart/form-data">
          <input
            type="file"
            onChange={this.selectImages}
            multiple
            name="myfile"
          />
          <button onClick={this.onSubmitHandler}>Add images</button>
        </form>
        {festivalimages}
      </div>
    );
  }
}
