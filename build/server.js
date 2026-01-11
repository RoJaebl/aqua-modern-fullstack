"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _morgan = _interopRequireDefault(require("morgan"));
var _root = _interopRequireDefault(require("./routers/root.router"));
var _user = _interopRequireDefault(require("./routers/user.router"));
var _video = _interopRequireDefault(require("./routers/video.router"));
var _locals = _interopRequireDefault(require("./middlewares/locals.middleware"));
var _expressHttpProxy = _interopRequireDefault(require("express-http-proxy"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _route = require("./middlewares/route.middlware");
var _api = _interopRequireDefault(require("./routers/api.router"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var isDev = process.env.NODE_ENV === "development";
var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: isDev ? process.env.DB_URL : process.env.DB_URL_DEPLOY
  })
}));
app.use(_locals["default"]);
app.use((0, _expressFlash["default"])());
app.use("/public", isDev ? (0, _expressHttpProxy["default"])("http://localhost:3000") : _express["default"]["static"]("public"));
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/ffmpeg", _express["default"]["static"]("node_modules/@ffmpeg"));
app.use("/.well-known", _express["default"]["static"](".well-known"));
app.use("/", _root["default"]);
app.use("/users", _user["default"]);
app.use("/videos", _video["default"]);
app.use("/api", _api["default"]);
app.use(_route.notFoundMiddleware);
var _default = exports["default"] = app;