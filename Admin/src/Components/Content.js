import React, { Component } from "react";

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
          <h1>{this.props.linktoRender}</h1>

          <h2 />
        </center>
      </body>
    );
  }
}
