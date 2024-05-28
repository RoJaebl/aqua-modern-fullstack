import $ from "jquery";

class Displayer {
  private id: NodeJS.Timeout;
  constructor(
    public element: JQuery<HTMLElement>,
    public option: { time: number } = { time: 3000 }
  ) {}
  show() {
    this.element.addClass("showing");
    this.id && clearTimeout(this.id);
    return this;
  }
  hide() {
    const { time } = this.option;
    const showing = () => this.element.removeClass("showing");
    this.id = setTimeout(showing, time);
    return this;
  }
  cycle() {
    this.show();
    this.hide();
  }
}
const formatTime = (seconds: number) => {
  const time = new Date(seconds * 1000)
    .toISOString()
    .substring(11, 19)
    .replace(/:/g, "");
  const timestr = Number(time).toString().padStart(3, "0");

  const hour = timestr.slice(-6, -4) + ":";
  const min = timestr.slice(-4, -2) + ":";
  const sec = timestr.slice(-2);
  return (3600 <= seconds ? hour : "") + min + sec;
};
const playClick = () => {
  const isPaused = $("video").prop("paused");
  isPaused ? $("video").trigger("play") : $("video").trigger("pause");
  $("#play")
    .children("i")
    .prop({
      classList: isPaused ? "fas fa-pause" : "fas fa-play",
    });
  $("#videoPlayState > i").prop({
    classList: isPaused ? "fa-solid fa-play fa-5x" : "fa-solid fa-pause fa-5x",
  });
};
const playStateAll = () => {
  playClick();
  controls.cycle();
  playState.cycle();
};

const controls = new Displayer($("#videoControls"));
const playState = new Displayer($("#videoPlayState"), {
  time: 500,
});

$("video").on({
  loadedmetadata: function () {
    const time = Math.floor($("video").prop("duration"));
    $("#totalTime").prop({
      innerText: formatTime(time),
    });
    $("#timeline").prop({ max: time });
  },
});

$(function () {
  $("video").prop({ volume: 0.5 });

  $("#play").on({ click: () => playClick });
  $("#mute").on({
    click: () => {
      const isMuted = $("video")
        .prop({ muted: !$("video").prop("muted") })
        .prop("muted");
      $("#mute > i").prop({
        classList: isMuted ? "fas fa-volume-mute" : "fas fa-volume-up",
      });
      $("#volume").prop({
        value: isMuted ? 0 : $("video").prop("volume"),
      });
    },
  });
  $("#volume").on({
    input: (e) => {
      const isMuted = $("video").prop("muted");
      isMuted && $("video").prop({ muted: !isMuted });
      isMuted &&
        $("#mute > i").prop({
          classList: "fas fa-volume-up",
        });
      $("video").prop({ volume: e.target["value"] });
    },
  });
  $("video").on({
    timeupdate: () => {
      const curTime = Math.floor($("video").prop("currentTime"));
      $("#currentTime").prop({ innerText: formatTime(curTime) });
      $("#timeline").prop({ value: curTime });
    },
    ended: () => {
      const { id } = $("#videoContainer").prop("dataset");
      fetch(`/api/videos/${id}/views`, { method: "POST" });
    },
  });

  $("#timeline").on({
    input: (e) => $("video").prop({ currentTime: e.target["value"] }),
  });
  $("#fullScreen").on({
    click: () => {
      const fullscreen = document.fullscreenElement;
      fullscreen
        ? document.exitFullscreen()
        : $("#videoContainer").trigger("requestFullscreen");
      $("#fullScreen > i").prop({
        classList: fullscreen ? "fas fa-expand" : "fas fa-compress",
      });
    },
  });
  $(this).on({
    keypress: (e) => {
      if (e.code === "Space") {
        playStateAll();
      }
    },
  });
  $("#videoContainer").on({
    mousemove: () => controls.cycle(),
    mouseleave: () => controls.hide(),
    click: () => playStateAll(),
  });
});
