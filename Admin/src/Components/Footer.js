import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer class="footer">
        <div class="container">
          <div class="copyright text-center">
            Copyright &copy;
            <script>document.write(new Date().getFullYear());</script> All
            rights reserved | This template is made with{" "}
            <i class="fa fa-heart-o" aria-hidden="true" /> by{" "}
            <a href="https://colorlib.com" target="_blank">
              Colorlib
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
