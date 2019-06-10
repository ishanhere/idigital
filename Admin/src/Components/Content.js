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
    // if (this.props.linktoRender == "Companies") return <Company />;
    // else if (this.props.linktoRender == "Festivals_Images")
    //   return <Festivals_Images />;
    // else return <h6>Not Found</h6>;
    return (
      <body>
        <center>
          <h1>Jay mahadev Shree Ganesh</h1>
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
// if (this.props.linktoRender == "Companies") return <Company />;
// else {
//   if (this.props.conditionB) return <Festivals_Images />;
//   else return <h6>Not Found</h6>;
// }
