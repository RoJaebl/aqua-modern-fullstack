"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var localsMiddleware = function localsMiddleware(req, res, next) {
  var locals = res.locals;
  var _req$session = req.session,
    loggedIn = _req$session.loggedIn,
    _req$session$user = _req$session.user,
    user = _req$session$user === void 0 ? {} : _req$session$user;
  Object.assign(locals, {
    siteName: "Aqua Modern Fullstack",
    loggedIn: loggedIn,
    user: user,
    isDev: process.env.NODE_ENV === "development"
  });
  next();
};
var _default = exports["default"] = localsMiddleware;