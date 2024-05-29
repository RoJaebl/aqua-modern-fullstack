"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _video = require("../controllers/video.controller");
var _multer = require("../middlewares/multer.middleware");
var _gaurd = require("../middlewares/gaurd.middlware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var videoRouter = _express["default"].Router();
videoRouter.route("/upload").all(_gaurd.guardMiddleware).get(_video.upload).post(_multer.videoUpload.fields([{
  name: "video"
}, {
  name: "thumb"
}]), (0, _gaurd.videoValidateMiddleware)("videos/upload"), _video.postUpload);
videoRouter.route("/:id([0-9a-f]{24})").all((0, _gaurd.paramMiddleware)("video", ["owner", "comments"])).get(_video.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all((0, _gaurd.paramMiddleware)("video"), _gaurd.videoAuthorizeMiddleware).get(_video.edit).post((0, _gaurd.videoValidateMiddleware)("videos/edit"), _video.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all((0, _gaurd.paramMiddleware)("video", "owner"), _gaurd.videoAuthorizeMiddleware).get(_video.remove);
var _default = exports["default"] = videoRouter;