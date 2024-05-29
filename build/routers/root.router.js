"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _video = require("../controllers/video.controller");
var _user = require("../controllers/user.controller");
var _gaurd = require("../middlewares/gaurd.middlware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rootRouter = _express["default"].Router();
rootRouter.route("/").get(_video.home);
rootRouter.route("/signup").all(_gaurd.restrictMiddleware).get(_user.signup).post(_user.postSignup);
rootRouter.route("/signin").all(_gaurd.restrictMiddleware).get(_user.signin).post(_user.postSignin);
rootRouter.route("/signin/oauth/github").all(_gaurd.restrictMiddleware).get(_user.ghSignin);
rootRouter.route("/signin/oauth/github/access").all(_gaurd.restrictMiddleware).get(_user.ghSigninAccess);
rootRouter.get("/search", _video.search);
var _default = exports["default"] = rootRouter;