import React, { Component } from "react";
// var ReactDOM = require("react-dom");
import $ from "jquery";
// import "./user";
import "./CSS/basic.css";
import "./CSS/style.css";
import "./CSS/media.css";
// import "./JS/mainCanvas";
import ReactDOM from "react-dom";
import download_pic from "./Images/download.png";
import avk from "./Images/avk.jpg";
import DisplayImages from "./DisplayImages";
// import "./JS/html2canvas";
// import "./JS/mainCanvas";

// $(document).ready(function() {
//   alert("Loda");
//   $("div[name='xyz']")
//     .has("img")
//     .mouseover(function() {
//       alert("Lassan");
//     });
// });
// function capture() {
//   html2canvas(document.querySelector("#canvas"), {
//     scale: 2,
//     //     logging: true,
//     //     letterRendering: 1,
//     //     profile: true,
//     allowTaint: false,
//     useCORS: true
//   }).then(canvas => {
//     var img = canvas.toDataURL("image/jpg");
//     document.getElementsByClassName("preview")[0].innerHTML =
//       "<img src='" + img + "'>";
//     //document.getElementById("prv").src = img;
//   });
// }

function editElement(elmnt, conMenu) {
  var layer = document.getElementById("layer");
  layer.style.background = "rgba(0, 0, 0, .6)";
  conMenu.parentNode.removeChild(conMenu);
  var nd = document.createElement("DIV");
  if (elmnt.children[0].nodeName == "IMG") {
    // nd.className = "dragable contextEditImg";
    nd.className = "contextEditImg";
    // nd.setAttribute("onmouseover", "dragElement(this)");
    nd.innerHTML = "<h1>Edit Image</h1>";
  } else {
    nd.className = "contextEditTxt";
    nd.innerHTML = "<h1>Edit Text</h1>";
  }

  document.getElementsByClassName("canvasArea")[0].appendChild(nd);
  layer.onclick = function() {
    cancelElement(nd);
  };
  // alert(window.scrollX + " " + window.scrollY);
}

function delElement(x, conMenu) {
  // alert(id);
  // var x = document.getElementById(id);
  // alert(document.getElementById(id).parentNode);
  x.parentNode.removeChild(x);
  conMenu.parentNode.removeChild(conMenu);
  document.getElementById("layer").style.display = "none";
  // alert("hello");
}

function cancelElement(conMenu) {
  var layer = document.getElementById("layer");
  // elmnt.parentNode.removeChild(elmnt);
  conMenu.parentNode.removeChild(conMenu);
  layer.style.display = "none";
  layer.style.background = "transparent";
  // alert("hello");
}

function adddiv(h = "auto", w = "auto", str) {
  var s = h + " X " + w;
  var nd = document.createElement("DIV");
  var nimg = document.createElement("IMG");
  // nimg.src = "https://freepngimg.com/thumb/diwali/31758-5-diwali-picture.png";
  // nimg.src = "download.png";
  nimg.src = str;
  nimg.setAttribute("style", "height:" + h + "px; width:" + w + "px;");
  nd.className = "dragable";
  nd.setAttribute("onmouseover", "dragElement(this)");
  nd.setAttribute(
    "oncontextmenu",
    "contextOnElement(this,event); return false"
  );
  nd.setAttribute("style", "height:" + h + "px; width:" + w + "px;");
  nd.appendChild(nimg);
  document.getElementById("canvas").appendChild(nd);
}

function getDivVal() {
  // var v = document.getElementById('canvas').querySelectorAll('*');
  var v = document.getElementById("canvas").innerHTML;
  document.getElementById("putDivVal").innerHTML = v;
}
function ab() {
  alert("k");
}

(function() {
  var container = document.getElementById("canvas");
  var active = false;
  var elmnt;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  // container.addEventListener("touchstart", dragStart, { passive: false, capture: false });
  // container.addEventListener("touchend", dragEnd, { passive: false, capture: false });
  // container.addEventListener("touchmove", drag, { passive: false, capture: false });
  function dragStart(e) {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
    elmnt = e.target;

    if (e.target === elmnt) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active && e.target != container) {
      e.preventDefault();

      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      elmnt.style.transform =
        "translate3d(" + currentX + "px, " + currentY + "px, 0)";
      // setTranslate(currentX, currentY, dragItem);
    }
  }

  // function setTranslate(xPos, yPos, el) {
  //     el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  // }
})();

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.displayData = [];
    this.state = {
      showdata: this.displayData,
      arrimages: []
    };
    this.appendData = this.appendData.bind(this);
    this.dragElement = this.dragElement.bind(this);
    this.contextOnElement = this.contextOnElement.bind(this);
    this.showimages = this.showimages.bind(this);
    this.readUrl = this.readUrl.bind(this);
    this.clsupld = this.clsupld.bind(this);
    this.appendText = this.appendText.bind(this);
    this.addTxtToCanvas = this.addTxtToCanvas.bind(this);
    this.clrChangeTxt = this.clrChangeTxt.bind(this);
  }
  componentDidMount() {
    this.showimages();
  }
  showimages() {
    var url = "http://localhost:5000/api/showimages";
    fetch(url)
      .then(response => response.json())
      .then(e => {
        this.setState({ arrimages: e.express });
      });
  }
  clrChangeTxt = elmnt => {
    // alert();
    console.log(elmnt.target.value);
    console.log(elmnt.target.parentNode.style.background);
    var clr = elmnt.target.value;
    elmnt.target.parentNode.style.background = clr;
  };
  addTxtToCanvas() {
    // alert(val);
    // this.addTxtToCanvas(
    //   //   document.getElementById("addText"),
    //   //   document.getElementById("txtClr").style.backgroundColor,
    //   //   document.getElementById("txtSize")
    var clr = document.getElementById("txtClr").style.backgroundColor;
    var size = document.getElementById("txtSize").value;
    var txt = document.getElementById("addText").value;
    console.log(document.getElementById("addText").value);
    console.log(document.getElementById("txtSize").value);
    console.log(document.getElementById("txtClr").style.backgroundColor);
    const pStyle = {
      color: clr,
      fontSize: size + "px"
    };
    this.displayData.push(
      <div
        className="dragable"
        onMouseOver={this.dragElement}
        onContextMenu={this.contextOnElement}
        // key={"img_drag_" + c}
      >
        <p style={pStyle}>{txt}</p>
      </div>
    );
    this.setState({
      showdata: this.displayData
    });
    // var nd = document.createElement("DIV");
    // var np = document.createElement("P");
    // nd.className = "dragable";
    // np.setAttribute(
    //   "style",
    //   "color: " + clr + "; font-size: " + size.value + "px;"
    // );
    // np.innerHTML = elmnt.value;
    // elmnt.value = "";
    // size.value = "";
    // nd.setAttribute("onmouseover", "dragElement(this)");
    // nd.setAttribute(
    //   "oncontextmenu",
    //   "contextOnElement(this,event); return false"
    // );
    // nd.appendChild(np);
    // document.getElementById("canvas").appendChild(nd);
  }
  appendData(elmnt) {
    // console.log(e);
    let src = elmnt.target.src;
    var c = this.state.count;
    this.displayData.push(
      <div
        className="dragable"
        onMouseOver={this.dragElement}
        onContextMenu={this.contextOnElement}
        // key={"img_drag_" + c}
      >
        <img src={src} height="auto" width="200px" />
      </div>
    );
    this.setState({
      showdata: this.displayData
    });
  }
  appendText(elmnt) {
    // console.log(elmnt.target.children[0]);
    console.log(elmnt.target.tagName);
    console.log(elmnt.target.parentNode.children[1].innerHTML);
    // if (elmnt.target.tagName != "DIV") {
    //   elmnt = elmnt.target.parentNode;
    //   console.log(elmnt);
    // }
    if (elmnt.target.tagName === "DIV") {
      this.displayData.push(
        <div
          className="dragable"
          onMouseOver={this.dragElement}
          onContextMenu={this.contextOnElement}
          // key={"img_drag_" + c}
        >
          <p>{elmnt.target.children[1].innerHTML}</p>
        </div>
      );
    } else {
      this.displayData.push(
        <div
          className="dragable"
          onMouseOver={this.dragElement}
          onContextMenu={this.contextOnElement}
          // key={"img_drag_" + c}
        >
          <p>{elmnt.target.parentNode.children[1].innerHTML}</p>
        </div>
      );
    }
    this.setState({
      showdata: this.displayData
    });
  }
  dragElement = e => {
    // console.log(e.clientX);
    // console.log(e.clientY);
    // console.log(e.target.parentNode);
    var es = e.target.parentNode;
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    es.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
      // alert("dragmouse Down");
      // var e = document.getElementById(id);
      e = e || window.event;
      // e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      // var es = document.getElementById(id);
      // alert("Element Drag");
      // console.log(e);
      // alert("ClassName " + es.className);
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      // console.log("clientX " + clientX + " clientY " + clientY);
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      es.style.top = es.offsetTop - pos2 + "px";
      es.style.left = es.offsetLeft - pos1 + "px";
      // alert("ptyu");
    }
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      // alert("Close Drag Element");
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  readUrl = e => {
    console.log(e.target.files[0].name);
    var fr = new FileReader();
    fr.onload = function(e) {
      console.log(e.target.result);
      document.getElementById("showImg").src = e.target.result;
    };
    console.log(e.target);
    fr.readAsDataURL(e.target.files[0]);
    document.getElementById("imgDetail").style.display = "block";
  };

  clsupld() {
    document.getElementById("imgDetail").style.display = "none";
    // document.getElementById("showImg").src = "";
  }
  contextOnElement = e => {
    console.log(e);
    console.log(e.target);
    e.preventDefault();
    // elmnt.parentNode.removeChild(elmnt);
    // let elmnt = document.getElementById(id);
    // alert(" id" + id);
    var layer = document.getElementById("layer");
    // alert(layer);
    // alert(e);
    var x = e.clientX - 200;
    // alert("Client x " + x);
    var y = e.clientY + window.scrollY - 200;
    // alert("Client y " + y);
    var nd = document.createElement("DIV");
    // alert(nd);
    nd.className = "contextDiv";
    // alert(nd.className);
    var bt1 = document.createElement("I");
    // alert(bt1);
    var bt2 = document.createElement("I");
    // alert(bt2);
    // // bt1.className = "far fa-trash-alt contextIcon";
    bt1.className = "material-icons contextIcon";
    // alert(bt1.className);
    bt1.innerHTML = "delete_outline";
    // alert(bt1.innerHTML);
    var ee = e.target.parentNode;
    bt1.onclick = function() {
      delElement(ee, nd);
    };
    // bt2.className = "far fa-edit contextIcon";
    bt2.className = "material-icons contextIcon";
    // alert(bt2.className);
    bt2.innerHTML = "edit";
    // alert(bt2.innerHTML);
    bt2.onclick = function() {
      editElement(ee, nd);
    };
    nd.setAttribute("style", "top:" + y + "px; left:" + x + "px;");
    // alert("set at");
    nd.appendChild(bt1);
    // alert("app c 1");
    nd.appendChild(bt2);
    // alert("app c 2");
    document.getElementsByClassName("canvasArea")[0].appendChild(nd);
    // alert("nd app");
    layer.style.display = "block";
    layer.onclick = function() {
      cancelElement(nd);
    };
    return false;
  };

  clrChange(elmnt, id) {
    // var clr = elmnt.value;
    var elmnt = document.getElementById(id);
    var clr = elmnt.value;
    // alert(elmnt);
    // alert(clr);
    elmnt.parentNode.style.background = clr;
    // elmnt.parentNode.style.backgroundColor = clr;
    document.getElementById("canvas").style.background = clr;
  }
  showSubMenu = num => {
    // alert(num);
    console.log(num);
    let nd = document.getElementsByClassName("subMenuBox")[0].children;
    for (var i = 0; i < nd.length; i++) {
      nd[i].classList.add("hght-0", "ovf-hid", "op-0");
      nd[i].classList.remove("h-100", "pd-10");
    }
    nd[num].classList.remove("hght-0", "ovf-hid", "op-0");
    nd[num].classList.add("h-100", "pd-10");
  };
  render() {
    const festivalimages = this.state.arrimages.map(item => (
      <DisplayImages item={item} append={this.appendData} />
    ));
    return (
      <div className="container">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <div className="designArea">
          <div className="canvasArea">
            <div className="canvasContainer">
              <div id="canvas" ref={elem => (this.can = elem)}>
                {this.displayData}
              </div>
            </div>
            <div id="layer" />
          </div>
          <div className="toolBoxArea">
            <form className="toolBar">
              <input
                type="radio"
                name="toolRadio"
                id="toolImg"
                onChange={e => this.showSubMenu(0, e)}
                // checked
              />
              <label className="toolDiv" htmlFor="toolImg">
                <i className="material-icons">add_photo_alternate</i>
                {/* <i className="material-icons" /> */}
                <span>Images</span>
              </label>
              <input
                type="radio"
                name="toolRadio"
                id="toolComp"
                onChange={e => this.showSubMenu(1, e)}
              />
              <label className="toolDiv" htmlFor="toolComp">
                <i className="material-icons">assignment</i>
                <span>Company</span>
              </label>
              <input
                type="radio"
                name="toolRadio"
                id="toolText"
                onChange={e => this.showSubMenu(2, e)}
              />
              <label className="toolDiv" htmlFor="toolText">
                <i className="material-icons">text_fields</i>
                <span>Text</span>
              </label>
              <input
                type="radio"
                name="toolRadio"
                id="toolColor"
                onChange={e => this.showSubMenu(3, e)}
              />
              <label className="toolDiv" htmlFor="toolColor">
                <i className="material-icons">color_lens</i>
                <span>Background</span>
              </label>
              <input
                type="radio"
                name="toolRadio"
                id="toolSave"
                onClick={e => this.showSubMenu(4, e)}
              />
              <label className="toolDiv" htmlFor="toolSave">
                <i className="material-icons">save</i>
                <span>Save</span>
              </label>
            </form>
            <div className="subMenuBox">
              <div className="subMenuImg h-100 pd-10">
                <span>Add Photo</span>
                <form
                  className="upldBtnDiv"
                  method="POST"
                  encType="multipart/form-data"
                  action="#"
                >
                  <label className="btn">
                    <input
                      type="file"
                      id="myfile"
                      name="myfile"
                      accept="image/*"
                      // onClick={this.ab}
                      onChange={this.readUrl}
                    />
                    Upload Photo
                  </label>
                  <div className="imgDetailCover" id="imgDetail">
                    <label className="cls" onClick={this.clsupld}>
                      <button type="reset">×</button>
                    </label>
                    <table celspacing="10">
                      <tbody>
                        <tr>
                          <td>
                            <img src="#" id="showImg" />
                          </td>
                          <td>
                            <input type="text" placeholder="Title of text" />
                            <br />
                            <input type="checkbox" id="chkSharable" />
                            <label htmlFor="chkSharable">Sharable</label>
                            <br />
                            <select>
                              <select>HELLO</select>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="submit"
                              className="btn-i"
                              value="Upload"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
                <hr className="hr-light" />
                <div className="searchImgDiv">
                  <input
                    type="text"
                    className="search"
                    placeholder="Search..."
                  />
                  <i className="material-icons search">search</i>
                </div>
                <div className="imgList">{festivalimages}</div>
              </div>
              <div className="subMenuComp hght-0 ovf-hid op-0">
                {/* <span>Add Company</span> */}
                <span>Add Company</span>
                <div class="compDetailList">
                  <div class="mr-top-50">
                    <h3>Logo</h3>
                    <img
                      src={"http://localhost:3000/files/" + this.props.logo}
                      onClick={this.appendData}
                    />
                  </div>
                  <div class="mr-top-20" onClick={this.appendText}>
                    <h6>Company</h6>
                    <h4>{this.props.cname}</h4>
                  </div>
                  <div class="mr-top-20" onClick={this.appendText}>
                    <h6>Address</h6>
                    <h4>{this.props.address}</h4>
                  </div>
                  <div class="mr-top-20" onClick={this.appendText}>
                    <h6>Contact</h6>
                    <h4>{this.props.phone}</h4>
                  </div>
                </div>
              </div>
              <div className="subMenuText hght-0 ovf-hid op-0">
                <span>Add Text</span>
                <input
                  type="text"
                  id="addText"
                  class="text mr-top-50"
                  placeholder="Your text here"
                />
                <span class="mr-top-20">Chose color for your text</span>
                <span id="txtClr" class="clrPickerDiv mr-top-10">
                  <input
                    type="color"
                    id="clr_2"
                    class="clrPicker"
                    onChange={this.clrChangeTxt}
                  />
                </span>
                <span class="mr-top-20">Font Size</span>
                <input
                  type="number"
                  id="txtSize"
                  class="text mr-top-10"
                  placeholder="Size"
                />
                <div class="upldBtnDiv">
                  <input
                    type="button"
                    class="btn"
                    value="Add Text"
                    // onClick={this.addTxtToCanvas(
                    //   document.getElementById("addText"),
                    //   document.getElementById("txtClr").style.backgroundColor,
                    //   document.getElementById("txtSize")
                    // )}
                    onClick={this.addTxtToCanvas}
                  />
                </div>
              </div>
              <div className="subMenuColor hght-0 ovf-hid op-0">
                <span>Add BG Color</span>
                <span className="mr-top-50">Select Background color</span>
                <br />
                <span className="clrPickerDiv">
                  <input
                    type="color"
                    // value="#ffffff"
                    id="clr_1"
                    className="clrPicker"
                    onChange={e => this.clrChange(this.id, "clr_1", e)}
                  />
                </span>
              </div>
              <div className="subMenuSave hght-0 ovf-hid op-0">
                <span>Save Template</span>
              </div>
            </div>
          </div>
        </div>

        <script src="JS/mainCanvas.js" />
      </div>
    );
  }
}
