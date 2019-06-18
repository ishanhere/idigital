import React, { Component } from "react";
import Card from "./Card";

export default class Festival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      festivals: [],
      data: false
      // festivaltoshowimages: null
    };
    // this.setfestival = this.setfestival.bind(this);
  }
  // setfestival = newfestival => {
  //   this.setState({
  //     festivaltoshowimages: newfestival
  //   });
  //   alert("new state:" + newfestival);
  //   this.forceUpdate();
  // };
  componentDidMount() {
    fetch("http://localhost:5000/api/listfestivals")
      .then(response => response.json())
      .then(e => this.setState({ festivals: e.express, data: true }));
  }

  render() {
    const festivalitems = this.state.festivals.map(item => (
      <Card item={item} />
    ));

    return (
      <div className="ministries">
        <div className="container">
          <div className="featival-item">
            <div className="row ministries_row">
              {this.state.data ? festivalitems : "Loading"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// function Card(props) {
//   let images = "";
//   function handleClick(e, newfestivalid) {
//     // e.preventDefault();
//     fetch("http://localhost:5000/api/listfestivals")
//       .then(response => response.json())
//       .then(e => this.setState({ images: e.express, data: true }));
//     alert(images);
//   }
// }
