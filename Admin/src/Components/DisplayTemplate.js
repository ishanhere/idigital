import React, { Component } from "react";

export default class DisplayTemplate extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    var str = this.props.item.src;
    var res = str.split("_");
    return (
      <div onClick={this.props.loadtmp}>
        <img
          src={"http://localhost:3000/template_pic/" + this.props.item.src}
        />
        <span>{res[0]}</span>
        <textarea hidden>{this.props.item.code}</textarea>
      </div>
    );
  }
}
