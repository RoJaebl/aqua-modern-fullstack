"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../controllers/user.controller");
var _multer = require("../middlewares/multer.middleware");
var _gaurd = require("../middlewares/gaurd.middlware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userRouter = _express["default"].Router();
userRouter.route("/signout").all(_gaurd.authorizeMiddleware).get(_user.signout);
userRouter.route("/profile").all(_gaurd.authorizeMiddleware, _gaurd.guardMiddleware).get(_user.profile).post(_multer.avatarUpload.single("avatar"), _user.postProfile);
userRouter.route("/change-password").all(_gaurd.authorizeMiddleware, _gaurd.socialOnlyMiddleware, _gaurd.guardMiddleware).get(_user.changePassword).post(_user.postChangePassword);
userRouter.route("/:id([0-9a-z]{24})").all((0, _gaurd.paramMiddleware)("user", {
  path: "videos",
  populate: {
    path: "owner",
    model: "User"
  }
})).get(_user.summary);
var _default = exports["default"] = userRouter;