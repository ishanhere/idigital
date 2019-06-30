import React, { Component } from "react";
import Company from "./Company";
import Festivals_Images from "./Festivals_Images";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
// import Editor from "./Editor";
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
    // else if (this.props.linktoRender == "editor") val = "editor";

    return (
      <div>
        <center>
          <h1>Shree Ganesh</h1>
          {this.props.linktoRender == "Companies" ? (
            <Company {...this.props} />
          ) : this.props.linktoRender == "Festivals_Images" ? (
            <Festivals_Images />
          ) : (
            // ) : this.props.linktoRender == "editor" ? (
            //   <Editor {...this.props} />
            <h6>Not Found</h6>
          )}
        </center>
      </div>
    );
  }
}
// if (this.props.linktoRender == "Companies") return <Company />;
// else {
//   if (this.props.conditionB) return <Festivals_Images />;
//   else return <h6>Not Found</h6>;
// }
