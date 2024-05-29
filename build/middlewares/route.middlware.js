"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundMiddleware = void 0;
var notFoundMiddleware = exports.notFoundMiddleware = function notFoundMiddleware(req, res, next) {
  var locals = res.locals;
  var message = "페이지를 찾을 수 없습니다.";
  locals.error = {
    page: message
  };
  req.flash("404", message);
  return res.status(404).render("404");
};