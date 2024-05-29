"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _video = require("../controllers/video.controller");
var _gaurd = require("../middlewares/gaurd.middlware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();
apiRouter.route("/videos/:id([0-9a-f]{24})/views").all((0, _gaurd.paramMiddleware)("video")).post(_video.postView);
apiRouter.route("/videos/:id([0-9a-f]{24})/comment").all(_gaurd.guardMiddleware, (0, _gaurd.paramMiddleware)("video")).post(_video.postComment)["delete"](_gaurd.commentAuthorizeMiddleware, _video.removeComment);
var _default = exports["default"] = apiRouter;