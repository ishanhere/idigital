const html2canvas = require("html2canvas");
function capture() {
  html2canvas(document.querySelector("#canvas"), {
    scale: 2,
    //     logging: true,
    //     letterRendering: 1,
    //     profile: true,
    allowTaint: false,
    useCORS: true
  }).then(canvas => {
    var img = canvas.toDataURL("image/jpg");
    document.getElementsByClassName("preview")[0].innerHTML =
      "<img src='" + img + "'>";
    //document.getElementById("prv").src = img;
  });
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
