import React, { Component } from "react";
import Cards from "./Cards";
import ImegesofFestivals from "./ImegesofFestivals";

export default class Festival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whattoshow: true,
      festivalid: -1
    };
    this.whattoshow = this.whattoshow.bind(this);
  }

  whattoshow = festivalid => {
    this.setState({
      whattoshow: !this.state.whattoshow,
      festivalid: festivalid
    });
  };
  render() {
    return this.state.whattoshow ? (
      <Cards changecomponent={this.whattoshow} />
    ) : !this.state.whattoshow ? (
      <ImegesofFestivals
        festivalid={this.state.festivalid}
        changecomponent={this.whattoshow}
      />
    ) : (
      <h6>error occured</h6>
    );
  }
}
