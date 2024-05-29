"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Displayer = /*#__PURE__*/function () {
  function Displayer(element) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      time: 3000
    };
    _classCallCheck(this, Displayer);
    this.element = element;
    this.option = option;
  }
  return _createClass(Displayer, [{
    key: "show",
    value: function show() {
      this.element.addClass("showing");
      this.id && clearTimeout(this.id);
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this = this;
      var time = this.option.time;
      var showing = function showing() {
        return _this.element.removeClass("showing");
      };
      this.id = setTimeout(showing, time);
      return this;
    }
  }, {
    key: "cycle",
    value: function cycle() {
      this.show();
      this.hide();
    }
  }]);
}();
var formatTime = function formatTime(seconds) {
  var time = new Date(seconds * 1000).toISOString().substring(11, 19).replace(/:/g, "");
  var timestr = Number(time).toString().padStart(3, "0");
  var hour = timestr.slice(-6, -4) + ":";
  var min = timestr.slice(-4, -2) + ":";
  var sec = timestr.slice(-2);
  return (3600 <= seconds ? hour : "") + min + sec;
};
var playClick = function playClick() {
  var isPaused = (0, _jquery["default"])("video").prop("paused");
  isPaused ? (0, _jquery["default"])("video").trigger("play") : (0, _jquery["default"])("video").trigger("pause");
  (0, _jquery["default"])("#play").children("i").prop({
    classList: isPaused ? "fas fa-pause" : "fas fa-play"
  });
  (0, _jquery["default"])("#videoPlayState > i").prop({
    classList: isPaused ? "fa-solid fa-play fa-5x" : "fa-solid fa-pause fa-5x"
  });
};
var playStateAll = function playStateAll() {
  playClick();
  controls.cycle();
  playState.cycle();
};
var controls = new Displayer((0, _jquery["default"])("#videoControls"));
var playState = new Displayer((0, _jquery["default"])("#videoPlayState"), {
  time: 500
});
(0, _jquery["default"])("video").on({
  loadedmetadata: function loadedmetadata() {
    var time = Math.floor((0, _jquery["default"])("video").prop("duration"));
    (0, _jquery["default"])("#totalTime").prop({
      innerText: formatTime(time)
    });
    (0, _jquery["default"])("#timeline").prop({
      max: time
    });
  }
});
(0, _jquery["default"])(function () {
  (0, _jquery["default"])("video").prop({
    volume: 0.5
  });
  (0, _jquery["default"])("#play").on({
    click: function click() {
      return playClick;
    }
  });
  (0, _jquery["default"])("#mute").on({
    click: function click() {
      var isMuted = (0, _jquery["default"])("video").prop({
        muted: !(0, _jquery["default"])("video").prop("muted")
      }).prop("muted");
      (0, _jquery["default"])("#mute > i").prop({
        classList: isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"
      });
      (0, _jquery["default"])("#volume").prop({
        value: isMuted ? 0 : (0, _jquery["default"])("video").prop("volume")
      });
    }
  });
  (0, _jquery["default"])("#volume").on({
    input: function input(e) {
      var isMuted = (0, _jquery["default"])("video").prop("muted");
      isMuted && (0, _jquery["default"])("video").prop({
        muted: !isMuted
      });
      isMuted && (0, _jquery["default"])("#mute > i").prop({
        classList: "fas fa-volume-up"
      });
      (0, _jquery["default"])("video").prop({
        volume: e.target["value"]
      });
    }
  });
  (0, _jquery["default"])("video").on({
    timeupdate: function timeupdate() {
      var curTime = Math.floor((0, _jquery["default"])("video").prop("currentTime"));
      (0, _jquery["default"])("#currentTime").prop({
        innerText: formatTime(curTime)
      });
      (0, _jquery["default"])("#timeline").prop({
        value: curTime
      });
    },
    ended: function ended() {
      var _$$prop = (0, _jquery["default"])("#videoContainer").prop("dataset"),
        id = _$$prop.id;
      fetch("/api/videos/".concat(id, "/views"), {
        method: "POST"
      });
    }
  });
  (0, _jquery["default"])("#timeline").on({
    input: function input(e) {
      return (0, _jquery["default"])("video").prop({
        currentTime: e.target["value"]
      });
    }
  });
  (0, _jquery["default"])("#fullScreen").on({
    click: function click() {
      var fullscreen = document.fullscreenElement;
      fullscreen ? document.exitFullscreen() : (0, _jquery["default"])("#videoContainer").trigger("requestFullscreen");
      (0, _jquery["default"])("#fullScreen > i").prop({
        classList: fullscreen ? "fas fa-expand" : "fas fa-compress"
      });
    }
  });
  (0, _jquery["default"])(this).on({
    keypress: function keypress(e) {
      if (e.code === "Space") {
        playStateAll();
      }
    }
  });
  (0, _jquery["default"])("#videoContainer").on({
    mousemove: function mousemove() {
      return controls.cycle();
    },
    mouseleave: function mouseleave() {
      return controls.hide();
    },
    click: function click() {
      return playStateAll();
    }
  });
});