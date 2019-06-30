import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div className="col-xl-4 col-md-4">
        <div className="ministry">
          <a
            href="#"
            title="click to add/show images."
            onClick={() => {
              this.props.changecomponent(this.props.item.fid);
            }}
          >
            <div className="ministry_image">
              <img
                src={
                  "http://localhost:3000/upload/" +
                  this.props.item.displaypicturepath
                }
                style={{ height: 300, width: 300, margin: 15, padding: 5 }}
              />
            </div>
            <div className="ministry_title">{this.props.item.fname}</div>
          </a>
        </div>
      </div>
    );
  }
}
