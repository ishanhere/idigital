import React, { Component } from "react";

export default class Content extends Component {
  // componentWillUpdate(props, newprops) {
  //   console.log(props, newprops);
  // }
  // shouldComponentUpdate() {
  //   return false;
  // }
  render() {
    console.log("content" + this.props.linktoRender);
    return (
      <body>
        <center>
          <h1>Shree Ganesh !!</h1>
          <h1>{this.props.linktoRender}</h1>
        </center>
      </body>
    );
  }
}
