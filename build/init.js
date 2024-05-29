"use strict";

require("dotenv/config.js");
require("./db");
var _server = _interopRequireDefault(require("./server"));
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isDev = process.env.NODE_ENV === "development";
var PORT = isDev ? process.env.PORT : "4000";
var listenPrint = function listenPrint(isDev, port) {
  return console.log("\u2705 Server listenting on port http".concat("://localhost:", port, " \uD83D\uDE80"));
};
_http["default"].createServer(_server["default"]).listen(PORT, function () {
  return listenPrint(true, PORT);
});