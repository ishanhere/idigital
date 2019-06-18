function contextOnElement(elmnt, event) {
  // elmnt.parentNode.removeChild(elmnt);
  var layer = document.getElementById("layer");
  var x = event.clientX;
  var y = event.clientY + window.scrollY - 70;
  var nd = document.createElement("DIV");
  nd.className = "contextDiv";
  var bt1 = document.createElement("I");
  var bt2 = document.createElement("I");
  // bt1.className = "far fa-trash-alt contextIcon";
  bt1.className = "material-icons contextIcon";
  bt1.innerHTML = "delete_outline";
  bt1.onclick = function() {
    delElement(elmnt, nd);
  };
  // bt2.className = "far fa-edit contextIcon";
  bt2.className = "material-icons contextIcon";
  bt2.innerHTML = "edit";
  bt2.onclick = function() {
    editElement(elmnt, nd);
  };
  nd.setAttribute("style", "top:" + y + "px; left:" + x + "px;");
  nd.appendChild(bt1);
  nd.appendChild(bt2);
  document.getElementsByClassName("canvasArea")[0].appendChild(nd);
  layer.style.display = "block";
  layer.onclick = function() {
    cancelElement(nd);
  };
  return false;
}

function cancelElement(conMenu) {
  var layer = document.getElementById("layer");
  // elmnt.parentNode.removeChild(elmnt);
  conMenu.parentNode.removeChild(conMenu);
  layer.style.display = "none";
  layer.style.background = "transparent";
  // alert("hello");
}

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

function delElement(elmnt, conMenu) {
  elmnt.parentNode.removeChild(elmnt);
  conMenu.parentNode.removeChild(conMenu);
  document.getElementById("layer").style.display = "none";
  // alert("hello");
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
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

  container.addEventListener("touchstart", dragStart, {
    passive: false,
    capture: false
  });
  container.addEventListener("touchend", dragEnd, {
    passive: false,
    capture: false
  });
  container.addEventListener("touchmove", drag, {
    passive: false,
    capture: false
  });
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

function showSubMenu(num) {
  var nd = document.getElementsByClassName("subMenuBox")[0].children;
  for (i = 0; i < nd.length; i++) {
    nd[i].classList.add("hght-0", "ovf-hid", "op-0");
    nd[i].classList.remove("h-100", "pd-10");
  }
  nd[num].classList.remove("hght-0", "ovf-hid", "op-0");
  nd[num].classList.add("h-100", "pd-10");
}

function readUrl(url) {
  var fr = new FileReader();
  fr.onload = function(e) {
    document.getElementById("showImg").src = e.target.result;
  };
  fr.readAsDataURL(url.files[0]);
  document.getElementById("imgDetail").style.display = "block";
}

function clsupld() {
  document.getElementById("imgDetail").style.display = "none";
  document.getElementById("showImg").src = "";
}

function addImgToCanvas(elmnt) {
  // alert(elmnt.src);
  var nd = document.createElement("DIV");
  var nimg = document.createElement("IMG");
  nimg.src = elmnt.src;
  nimg.setAttribute("style", "height: auto; width: 200px;");
  nd.className = "dragable";
  nd.setAttribute("onmouseover", "dragElement(this)");
  nd.setAttribute(
    "oncontextmenu",
    "contextOnElement(this,event); return false"
  );
  nd.appendChild(nimg);
  document.getElementById("canvas").appendChild(nd);
}

function clrChange(elmnt) {
  var clr = elmnt.value;
  elmnt.parentNode.style.background = clr;
  document.getElementById("canvas").style.background = clr;
}
