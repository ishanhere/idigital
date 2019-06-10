import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    var imgstyle = {
      height: 45,
      background: "rgb(255,0,0)",
      marginLeft: 5
    };
    return (
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 footer_col">
              <div class="logo_container">
                <div class="logo">
                  <a href="#">
                    <span>iDigital</span>
                    <img src="images/icon1.png" alt="" style={imgstyle} />
                  </a>
                </div>
                <div class="logo_subtitle">Cards & More</div>
              </div>
              <div class="footer_social">
                <ul>
                  <li>
                    <a href="https://www.google.com/">
                      <i class="fa fa-google-plus" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/">
                      <i class="fa fa-pinterest" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/">
                      <i class="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">
                      <i class="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-6 footer_col">
              <div class="footer_contact">
                <div class="footer_title">Contact Us</div>
                <ul>
                  <li>
                    <span>Address: </span>343,344 - Massimo A business Bench
                    Square , opp. tirupati shyam villa, 120ft canal road, Althan
                    Road, Althan Bhimrad road, Surat, Gujarat 395007
                  </li>
                  {/* <li class="footer_contact_phone">
                    <span>Phone: </span>
                    <div>
                      <div> +91 81608 19878</div>
                      <div> +91 74050 49398</div>
                      <div> +91 87804 32399</div>
                      <div> +91 93767 98914</div>
                    </div>
                  </li> */}
                  <li>
                    <span>Email: </span>idigital_world@gmail.com
                  </li>

                  <li>
                    <span>Phone: </span>
                    <br />
                    +91 81608 19878 <br /> +91 74050 49398 <br /> +91 87804
                    32399 <br /> +91 93767 98914
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="copyright text-center">
          Copyright &copy;
          <script>document.write(new Date().getFullYear());</script> All rights
          reserved | This template is made with{" "}
          <i class="fa fa-heart-o" aria-hidden="true" /> by{" "}
          <a href="https://colorlib.com" target="_blank">
            Colorlib
          </a>
        </div>
      </footer>
    );
  }
}
