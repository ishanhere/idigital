import React, { Component } from "react";
import Company from "./Company";
import Festivals_Images from "./Festivals_Images";
export default class Content extends Component {
  // componentWillUpdate(props, newprops) {
  //   console.log(props, newprops);
  // }
  // shouldComponentUpdate() {
  //   return false;
  // }
  render() {
    if (this.props.linktoRender == "Companies") var val = "Companies";
    else if (this.props.linktoRender == "Festivals / Images") val = "Festivals";

    return (
      <body>
        <center>
          <h1>Shree Ganesh !</h1>
          {this.props.linktoRender == "Companies" ? (
            <Company />
          ) : this.props.linktoRender == "Festivals_Images" ? (
            <Festivals_Images />
          ) : (
            <h6>Not Found</h6>
          )}
        </center>
      </body>
    );
  }
}
