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

// $(document).ready(function() {
//   alert("Loda");
//   $("div[name='xyz']")
//     .has("img")
//     .mouseover(function() {
//       alert("Lassan");
//     });
// });

// function addImgToCanvas(elmnt) {
//   alert("lodu");
//   // // alert(elmnt.src);
//   // let nd = document.createElement("DIV");
//   // // alert(nd);
//   // let nimg = document.createElement("IMG");
//   // nimg.src = elmnt.src;
//   // nimg.setAttribute("style", "height: auto; width: 200px;");
//   // nd.className = "dragable";
//   // nd.setAttribute("onmouseover", "dragElement(this)");
//   // nd.setAttribute(
//   //   "oncontextmenu",
//   //   "contextOnElement(this,event); return false"
//   // );
//   // nd.appendChild(nimg);
//   // // document.getElementById("canvas").appendChild(nd);
// }

// function showSubMenu(num) {
//   // let nd = document.getElementsByClassName("subMenuBox");
//   // [0].children;
//   // const nd = ReactDOM.findDOMNode("subMenuBox");
//   console.log(num);
//   //
//   // for (var i = 0; i < nd.length; i++) {
//   //   nd[i].classList.add("hght-0", "ovf-hid", "op-0");
//   //   nd[i].classList.remove("h-100", "pd-10");
//   // }
//   // nd[num].classList.remove("hght-0", "ovf-hid", "op-0");
//   // nd[num].classList.add("h-100", "pd-10");
// }
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

function delElement(e, conMenu, id) {
  // alert(id);
  var x = document.getElementById(id);
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

// function dragElement(elmnt) {
//   var pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;
//   elmnt.onmousedown = dragMouseDown;

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
//     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
// function dragElement() {
// let elmnt = document.getElementById(id);
// alert(elmnt + " id" + id);
// }
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
  constructor() {
    super();
    this.displayData = [];
    this.state = {
      count: 0
    };
    this.appendData = this.appendData.bind(this);
    // this.can.addEventListener("", this.handleNvEnter);
    // this.nv.addEventListener("nv-enter", this.handleNvEnter);
    // this.dragElement = this.dragElement.bind(this);
    // this.delElement = this.delElement.bind(this);
  }

  componentDidMount() {
    // this.can.addEventListener("click", e => this.handleNvEnter(e));
    this.can.addEventListener("onTouchStart", e => this.handleNvEnter(e));
  }
  handleNvEnter = event => {
    console.log("Nv Enter:", event);
    // event.preventDefault();
  };
  appendData(e) {
    let src = e.target.src;

    // alert(src);
    // "div",
    //       {
    //         className: "dragable",
    //         id: "img_drag_" + this.state.count,
    //         onMouseOver: this.dragElement("img_drag_" + this.state.count),
    //         onContextMenu: this.contextOnElement("img_drag_" + this.state.count)
    //       },
    //       React.createElement(
    //         "img",
    //         { src: elem, height: "auto", width: "200px" },
    //         this.props.label
    //       ),
    //       this.props.children
    var c = this.state.count;
    this.displayData.push(
      <div
        className="dragable"
        id={"img_drag_" + c}
        onMouseOver={e => this.dragElement("img_drag_" + c, e)}
        onContextMenu={e => this.contextOnElement("img_drag_" + c, e)}
        // onTouchMove = {e=>this.}
        // ref={elem => (this.can = elem)}
        // ref={elem => (this.can = elem)}
        key={"img_drag_" + c}
      >
        <img src={src} height="auto" width="200px" />
      </div>
    );
    this.setState({
      // showdata: this.displayData,
      count: c + 1
    });
    setTimeout(this.event, 3000);

    // console.log(this.displayData);

    // this.setState({
    //    showdata : this.displayData,
    //    postVal : ""
    // });
  }
  event() {
    // this.can.addEventListener("mouseover", this.handleNvEnter);
  }
  dragElement(id) {
    var e = document.getElementById(id);
    // alert("abc");
    // alert(e);
    // alert(e.className);
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    e.onmousedown = dragMouseDown;
    function dragMouseDown() {
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
      var es = document.getElementById(id);
      // alert("Element Drag");
      // console.log(e);
      // alert("ClassName " + es.className);
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
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
  }

  readUrl(url) {
    // var fr = new FileReader();
    // fr.onload = function(e) {
    //   document.getElementById("showImg").src = e.target.result;
    // };
    // fr.readAsDataURL(url.files[0]);
    // document.getElementById("imgDetail").style.display = "block";
  }

  clsupld() {
    // document.getElementById("imgDetail").style.display = "none";
    // document.getElementById("showImg").src = "";
  }
  addImgToCanvas(id) {
    // alert(elmnt);
    // alert(elmnt.src);
    let elem = document.getElementById(id).src;

    // var MyDiv = React.createClass({
    //   render: function() {
    //     return React.createElement(
    //       "div",
    //       {
    //         className: "dragable",
    //         id: "img_drag_" + this.state.count,
    //         onMouseOver: this.dragElement("img_drag_" + this.state.count),
    //         onContextMenu: this.contextOnElement("img_drag_" + this.state.count)
    //       },
    //       React.createElement(
    //         "img",
    //         { src: elem, height: "auto", width: "200px" },
    //         this.props.label
    //       ),
    //       this.props.children
    //     );
    //   }
    // });

    // var MyDiv = React.createElement(
    //   "div",
    //   {
    //     className: "dragable",
    //     id: "img_drag_" + this.state.count,
    //     onMouseOver: () => this.dragElement("img_drag_" + this.state.count),
    //     onContextMenu: () =>
    //       this.contextOnElement("img_drag_" + this.state.count)
    //   },
    //   React.createElement(
    //     "img",
    //     { src: elem, height: "auto", width: "200px" },
    //     this.props.label
    //   ),
    //   this.props.children
    // );

    // }
    // });

    let nd = document.createElement("DIV");
    // alert(MyDiv);
    // var object = this.refs.canvas;
    // object.appendChild(MyDiv);
    let nimg = document.createElement("IMG");
    nimg.src = elem;
    nimg.setAttribute("style", "height: auto; width: 200px;");
    nd.className = "dragable";
    nd.setAttribute("id", "img_drag_" + this.state.count);
    // nd.setAttribute("onMouseOver", dragElement("img_drag_" + this.state.count));
    nd.setAttribute("name", "xyz");
    nd.setAttribute("onClick", e => this.ab());
    // nd.setAttribute(
    //   "onContextMenu",
    //   "e => this.contextOnElement(img_drag_" +
    //     this.state.count +
    //     ",event,e); return false"
    // );
    nd.appendChild(nimg);
    // var abc = document.getElementById("img_drag_" + this.state.count);
    // alert(abc);
    document.getElementById("canvas").appendChild(nd);
    // document.getElementById("canvas").append( React.createElement(
    //   "div",
    //   {
    //     className: "dragable",
    //     id: "img_drag_" + this.state.count,
    //     onMouseOver: () => this.dragElement("img_drag_" + this.state.count),
    //     onContextMenu: () =>
    //       this.contextOnElement("img_drag_" + this.state.count)
    //   },
    //   React.createElement(
    //     "img",
    //     { src: elem, height: "auto", width: "200px" },
    //     this.props.label
    //   ),
    //   this.props.children
    // ));
    this.state.count = this.state.count + 1;
    console.log(this.state.count);
  }
  contextOnElement(id, ee) {
    ee.preventDefault();
    // elmnt.parentNode.removeChild(elmnt);
    // let elmnt = document.getElementById(id);
    // alert(" id" + id);
    var layer = document.getElementById("layer");
    // alert(layer);
    // alert(e);
    var x = ee.clientX - 200;
    // alert("Client x " + x);
    var y = ee.clientY + window.scrollY - 200;
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
    bt1.onclick = function() {
      delElement(ee, nd, id);
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
  }

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
    // const nd = ReactDOM.findDOMNode("subMenuBox");

    for (var i = 0; i < nd.length; i++) {
      nd[i].classList.add("hght-0", "ovf-hid", "op-0");
      nd[i].classList.remove("h-100", "pd-10");
    }
    nd[num].classList.remove("hght-0", "ovf-hid", "op-0");
    nd[num].classList.add("h-100", "pd-10");
  };
  render() {
    return (
      <div className="container">
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <div className="designArea">
          <div className="canvasArea">
            <div className="canvasContainer" onDrag={this.handleNvEnter}>
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
                      onClick={this.readUrl(this)}
                    />
                    Upload Photo
                  </label>
                  <div className="imgDetailCover" id="imgDetail">
                    <label className="cls" onClick={this.clsupld()}>
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
                              <option>Diwali</option>
                              <option>Holi</option>
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
                <div className="imgList">
                  <img
                    src={download_pic}
                    id="1"
                    // onClick={e => this.addImgToCanvas(1, e)}
                    onClick={this.appendData}
                  />
                  <img
                    src={avk}
                    id="2"
                    onClick={this.appendData}
                    // onClick={e => this.addImgToCanvas(2, e)}
                  />
                  <img
                    src={download_pic}
                    id="3"
                    onClick={this.appendData}
                    // onClick={e => this.addImgToCanvas(3, e)}
                  />
                  <img
                    src={avk}
                    id="4"
                    onClick={this.appendData}
                    // onClick={() => this.addImgToCanvas(4)}
                  />
                  <img
                    src={download_pic}
                    id="5"
                    onClick={this.appendData}
                    // onClick={e => this.addImgToCanvas(5, e)}
                  />
                  <img
                    src={avk}
                    id="6"
                    onClick={this.appendData}
                    // onClick={e => this.addImgToCanvas(6, e)}
                  />
                  <img
                    src={download_pic}
                    id="7"
                    onClick={this.appendData}
                    // onClick={e => this.addImgToCanvas(7, e)}
                  />
                </div>
              </div>
              <div className="subMenuComp hght-0 ovf-hid op-0">
                <span>Add Company</span>
              </div>
              <div className="subMenuText hght-0 ovf-hid op-0">
                <span>Add Text</span>
                <div className="upldBtnDiv">
                  <input type="button" className="btn" value="Add Text" />
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
