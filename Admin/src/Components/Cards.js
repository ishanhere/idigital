import React, { Component } from "react";
import Card from "./Card";

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      festivals: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/api/listfestivals")
      .then(response => response.json())
      .then(e => this.setState({ festivals: e.express }));
  }
  render() {
    const festivalitems = this.state.festivals.map(item => (
      <Card item={item} {...this.props} />
    ));
    return (
      <div className="ministries">
        <div className="container">
          <div className="featival-item">
            <div className="row ministries_row">{festivalitems}</div>
          </div>
        </div>
      </div>
    );
  }
}
