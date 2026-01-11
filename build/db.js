"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
require("./models/user.model");
require("./models/video.model");
require("./models/comment.model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isDev = process.env.NODE_ENV === "development";
_mongoose["default"].connect(isDev ? process.env.DB_URL : process.env.DB_URL_DEPLOY);
var db = _mongoose["default"].connection;
db.on("error", function (err) {
  return console.log("❌ DB Error: ", err);
});
db.once("open", function () {
  return console.log("✅ Connected to DB");
});