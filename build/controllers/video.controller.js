"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.upload = exports.search = exports.removeComment = exports.remove = exports.postView = exports.postUpload = exports.postEdit = exports.postComment = exports.home = exports.edit = void 0;
var _video = _interopRequireDefault(require("../models/video.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _fs = _interopRequireDefault(require("fs"));
var _comment = _interopRequireDefault(require("../models/comment.model"));
var _multer = require("../middlewares/multer.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var isDev = process.env.NODE_ENV === "development";
var home = exports.home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_, res) {
    var locals;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          locals = res.locals;
          locals.pageTitle = "Home";
          _context.next = 4;
          return _video["default"].find({}).sort({
            createdAt: "desc"
          }).populate("owner");
        case 4:
          locals.videos = _context.sent;
          return _context.abrupt("return", res.render("videos/home"));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var upload = exports.upload = function upload(_, res) {
  var locals = res.locals;
  locals.pageTitle = "Video Upload";
  return res.render("videos/upload");
};
var postUpload = exports.postUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var locals, _req$body, title, description, hashtags, user, files, fileUrls, newVidoe;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          locals = res.locals;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags, user = req.user, files = req.files;
          locals.pageTitle = "Video Upload";
          fileUrls = Object.entries(files).reduce(function (acc, cur) {
            var propName = {
              video: "fileUrl",
              thumb: "thumbUrl"
            }[cur[0]];
            return Object.assign(acc, _defineProperty({}, propName, cur[1][0][isDev ? "path" : "location"]));
          }, {});
          _context2.prev = 4;
          _context2.next = 7;
          return _video["default"].create(_objectSpread({
            title: title,
            description: description,
            hashtags: _video["default"].formatHashtags(hashtags),
            owner: user.id,
            comments: []
          }, fileUrls));
        case 7:
          newVidoe = _context2.sent;
          user.videos.push(newVidoe.id);
          user.save();
          return _context2.abrupt("return", res.redirect("/"));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](4);
          locals.error = {
            message: "비디오 생성에 실패하였습니다."
          };
          return _context2.abrupt("return", res.status(400).render("videos/upload"));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 13]]);
  }));
  return function postUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var watch = exports.watch = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _locals$video;
    var locals;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          locals = res.locals;
          locals.video = req.video;
          locals.pageTitle = (_locals$video = locals.video) === null || _locals$video === void 0 ? void 0 : _locals$video.title;
          return _context3.abrupt("return", res.render("videos/watch"));
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function watch(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var edit = exports.edit = function edit(_, res) {
  var locals = res.locals;
  locals.pageTitle = "Video Edit";
  return res.render("videos/edit");
};
var postEdit = exports.postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var video, _req$body2, title, description, hashtags;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          video = req.video, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
          _context4.next = 3;
          return _video["default"].findByIdAndUpdate(video.id, {
            title: title,
            description: description,
            hashtags: _video["default"].formatHashtags(hashtags)
          });
        case 3:
          return _context4.abrupt("return", res.redirect("/videos/".concat(video.id)));
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var remove = exports.remove = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$video, videoId, owner, fileUrl, thumbUrl, _ref6, userId, videos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$video = req.video, videoId = _req$video._id, owner = _req$video.owner, fileUrl = _req$video.fileUrl, thumbUrl = _req$video.thumbUrl;
          _ref6 = owner, userId = _ref6._id, videos = _ref6.videos;
          if (!isDev) {
            _context5.next = 6;
            break;
          }
          _fs["default"].rmSync(fileUrl);
          _context5.next = 8;
          break;
        case 6:
          _context5.next = 8;
          return (0, _multer.removeFile)(fileUrl);
        case 8:
          if (!isDev) {
            _context5.next = 12;
            break;
          }
          _fs["default"].rmSync(thumbUrl);
          _context5.next = 14;
          break;
        case 12:
          _context5.next = 14;
          return (0, _multer.removeFile)(thumbUrl);
        case 14:
          videos.splice(videos.indexOf(videoId), 1);
          _context5.next = 17;
          return _video["default"].findByIdAndDelete(videoId);
        case 17:
          _context5.next = 19;
          return _user["default"].findByIdAndUpdate(userId, {
            videos: videos
          });
        case 19:
          return _context5.abrupt("return", res.redirect("/"));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function remove(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var search = exports.search = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _locals$videos;
    var keyword, locals;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          keyword = req.query.keyword;
          locals = res.locals;
          locals.pageTitle = "Video Search";
          locals.videos = [];
          _context6.t0 = keyword;
          if (!_context6.t0) {
            _context6.next = 14;
            break;
          }
          _context6.t1 = (_locals$videos = locals.videos).push;
          _context6.t2 = _locals$videos;
          _context6.t3 = _toConsumableArray;
          _context6.next = 11;
          return _video["default"].find({
            title: {
              $regex: new RegExp("".concat(keyword), "i")
            }
          }).populate("owner");
        case 11:
          _context6.t4 = _context6.sent;
          _context6.t5 = (0, _context6.t3)(_context6.t4);
          _context6.t1.apply.call(_context6.t1, _context6.t2, _context6.t5);
        case 14:
          return _context6.abrupt("return", res.render("search"));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function search(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var postView = exports.postView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          req.video.meta.views += 1;
          _context7.next = 3;
          return req.video.save();
        case 3:
          return _context7.abrupt("return", res.sendStatus(200));
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function postView(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
var postComment = exports.postComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var user, video, body, videoId, videoComments, userId, userComments, newComment;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          user = req.user, video = req.video, body = req.body;
          videoId = video._id, videoComments = video.comments;
          userId = user._id, userComments = user.comments;
          _context8.next = 5;
          return _comment["default"].create({
            text: body.text,
            owner: userId,
            video: videoId
          });
        case 5:
          newComment = _context8.sent;
          videoComments.push(newComment.id);
          _context8.next = 9;
          return video.save();
        case 9:
          userComments.push(newComment.id);
          _context8.next = 12;
          return user.save();
        case 12:
          return _context8.abrupt("return", res.status(201).json({
            id: newComment.id
          }));
        case 13:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function postComment(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var removeComment = exports.removeComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var user, video, comment;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          user = req.user, video = req.video, comment = req.comment;
          video.comments.splice(video.comments.indexOf(comment._id), 1);
          _context9.next = 4;
          return video.save();
        case 4:
          user.comments.splice(user.comments.indexOf(comment._id), 1);
          _context9.next = 7;
          return user.save();
        case 7:
          _context9.next = 9;
          return _comment["default"].findByIdAndDelete(comment._id);
        case 9:
          return _context9.abrupt("return", res.sendStatus(201));
        case 10:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function removeComment(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();