import React, { Component } from "react";

export default class Displayfestivalbyimages extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <img
        style={{
          height: 200,
          width: 200,
          margin: 15,
          padding: 5,
          borderRadius: 20
        }}
        alt="unable to load."
        src={"http://localhost:3000/upload/" + this.props.item.path}
      />
    );
  }
}
