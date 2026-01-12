var click = document.getElementById("click");
var textarea = document.getElementById("textarea");
var clicks = document.getElementById("count");
var dcCount = document.getElementById("dcCount");
var reset = document.getElementById("reset");

var left = document.getElementById("left-click");
var right = document.getElementById("right-click");
var middle = document.getElementById("middle-click");

reset.onclick = function () {
  clicks.value = 0;
  dcCount.value = 0;
  textarea.value = "";
  click.style.background = "orange";
};

var prevClickMicrotime = microtime(true);
function microtime(get_as_float) {
  //  discuss at: http://phpjs.org/functions/microtime/
  // original by: Paulo Freitas
  //   example 1: timeStamp = microtime(true);
  //   example 1: timeStamp > 1000000000 && timeStamp < 2000000000
  //   returns 1: true

  var now = new Date().getTime() / 1000;
  var s = parseInt(now, 10);

  return get_as_float ? now : Math.round((now - s) * 1000) / 1000 + " " + s;
}

var prevClickMicrotime = microtime(true);

function clickEvent() {
  clickTime = microtime(true);
  diff = clickTime - prevClickMicrotime;
  if (diff <= 0.08) {
    click.style.background = "red";
    dcCount.value++;
  }
  textarea.value = diff + "\n" + textarea.value;
  prevClickMicrotime = clickTime;
  clicks.value++;
}

const buttons = {
  0: { name: "Left", element: left },
  1: { name: "Middle", element: middle },
  2: { name: "Right", element: right }
};

function mouseClick() {
  const e = window.event;
  const CLICK_HIGHLIGHT_TIME = 200; // ms

  if (e.button === 1) {
    e.preventDefault();
  }

  const btn = buttons[e.button];
  if (btn) {
    console.log(`${btn.name} button clicked`);
    btn.element.setAttribute("fill", "#fff");
    setTimeout(
      () => btn.element.setAttribute("fill", ""),
      CLICK_HIGHLIGHT_TIME
    );
  } else {
    console.log("Unknown button:", e.button);
  }

  console.log(e);
  clickEvent();
  return false;
}

//mouseClick();
