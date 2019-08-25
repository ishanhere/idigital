import React, { Component } from "react";
import Company from "./Company";
import Festivals_Images from "./Festivals_Images";
import Editor from "./Editor";
import Contact from "./Contact";
export default class Content extends Component {
  // componentWillUpdate(props, newprops) {
  //   console.log(props, newprops);
  // }
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const istyle = {
      height: "auto",
      width: "100%"
    };
    const sstyle = {
      width: "80%",
      height: "5vh",
      marginTop: "5vh",
      textAlign: "justify"
    };
    if (this.props.linktoRender == "Companies") var val = "Companies";
    else if (this.props.linktoRender == "Festivals / Images") val = "Festivals";
    else if (this.props.linktoRender == "editor") val = "editor";

    return (
      <div>
        <center>
          {/* <h1>Shree Ganesh !</h1> */}
          {this.props.linktoRender == "Companies" ? (
            <Company {...this.props} />
          ) : this.props.linktoRender == "Festivals_Images" ? (
            <Festivals_Images />
          ) : this.props.linktoRender == "editor" ? (
            <Editor {...this.props} />
          ) : this.props.linktoRender == "Contact" ? (
            <Contact />
          ) : (
            <div>
              <img src={"images/avk.jpg"} style={istyle} />
              <h6 align="center" style={sstyle}>
                Welcome, iDigital is a Web Application that will be used for
                creating images for marketing and festival wishes. You just need
                to add your company to the system and create images/templates as
                per requirements. Images/templates can be edited by Image editor
                interface. Companies can choose from the given images and also
                add their own images. Those images can be then used as the
                templates too.
                <br />
              </h6>
              <div class="copyright text-center">
                Made in India &copy;
                <script>document.write(new Date().getFullYear());</script> All
                rights reserved.Made with{" "}
                <i class="fa fa-heart-o" aria-hidden="true" /> by{" "}
                <a href="https://daiict.ac.in" target="_blank">
                  {" "}
                  iDigital - Apple Developers
                </a>
              </div>
            </div>
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
