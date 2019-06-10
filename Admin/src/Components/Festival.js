import React, { Component } from "react";

export default class Festival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      festivals: [],
      data: false
    };
  }
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

function Card(props) {
  return (
    <div className="col-xl-4 col-md-4">
      <div className="ministry">
        <div className="ministry_image">
          <img
            src="images/ministries_1.jpg"
            alt="https://unsplash.com/@davidbeale"
          />
        </div>
        <a href="">
          {" "}
          <div className="ministry_title">{props.item.fname}</div>
        </a>
      </div>
    </div>
  );
}
