import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import $ from "jquery";

let videoUrl: string;
let stream: MediaStream;

const files = {
  webm: "recording.webm",
  mp4: "output.mp4",
  jpg: "thumbnail.jpg",
};

const handleDownload = async () => {
  $("#actionBtn").prop({ disabled: true, innerText: "변환 중" }).off("click");

  const baseUrl = "http://localhost:4000/ffmpeg/core/dist/umd";
  const ffmpeg = new FFmpeg();
  ffmpeg.on("log", ({ message }) => console.log(message));

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseUrl}/ffmpeg-core.wasm`, "application/wasm"),
  });
  await ffmpeg.writeFile(files.webm, await fetchFile(videoUrl));
  await ffmpeg.exec(["-i", files.webm, "-r", "60", files.mp4]);
  await ffmpeg.exec([
    "-i",
    files.webm,
    "-ss",
    "00:00:01",
    "-vframes",
    "1",
    files.jpg,
  ]);
  ffmpeg.deleteFile(files.webm);
  URL.revokeObjectURL(videoUrl);

  const download = async (path: string, mime: string, name: string) => {
    const raw = (await ffmpeg.readFile(path)) as Uint8Array;
    const url = URL.createObjectURL(new Blob([raw.buffer], { type: mime }));
    $("<a/>").prop({ href: url, download: name }).get(0)?.click();
    ffmpeg.deleteFile(path);
    URL.revokeObjectURL(url);
  };

  download(files.mp4, "video/mp4", "MyRecording.mp4");
  download(files.jpg, "image/jpg", "MyThumbnail.jpg");

  $("#actionBtn")
    .prop({ disabled: false, innerText: "녹화 재시작" })
    .on({ click: handleStart });
  $("#preview").prop({ srcObject: stream }).trigger("play");
};

const handleStart = function () {
  $("#actionBtn").prop({ disabled: true, innerText: "녹화 중" }).off("click");
  const recorder = new MediaRecorder($("#preview").prop("srcObject"));
  recorder.ondataavailable = (e) => {
    videoUrl = URL.createObjectURL(e.data);
    $("#preview")
      .prop({
        srcObject: null,
        src: videoUrl,
        loop: true,
      })
      .trigger("play");
    $("#actionBtn")
      .prop({ disabled: false, innerText: "녹화본 다운로드" })
      .on({ click: handleDownload });
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 2000);
};

$(async function () {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 1024, height: 576 },
  });
  $("#preview").prop({ srcObject: stream }).trigger("play");
  $("#actionBtn").on({ click: handleStart });
});
