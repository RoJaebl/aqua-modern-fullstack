"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.summary = exports.signup = exports.signout = exports.signin = exports.profile = exports.postSignup = exports.postSignin = exports.postProfile = exports.postChangePassword = exports.ghSigninAccess = exports.ghSignin = exports.changePassword = void 0;
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _url = require("url");
var _fs = _interopRequireDefault(require("fs"));
var _multer = require("../middlewares/multer.middleware");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var isDev = process.env.NODE_ENV === "development";
var signin = exports.signin = function signin(_, res) {
  var locals = res.locals;
  locals.pageTitle = "Sign in";
  return res.render("users/signin");
};
var postSignin = exports.postSignin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _user$password;
    var locals, session, _req$body, username, password, user, isCompare;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          locals = res.locals;
          session = req.session, _req$body = req.body, username = _req$body.username, password = _req$body.password;
          locals.pageTitle = "Sign in";
          _context.next = 5;
          return _user["default"].findOne({
            username: username,
            socialOnly: false
          });
        case 5:
          user = _context.sent;
          _context.t0 = user;
          if (!_context.t0) {
            _context.next = 11;
            break;
          }
          _context.next = 10;
          return _bcrypt["default"].compare(password, (_user$password = user.password) !== null && _user$password !== void 0 ? _user$password : "");
        case 10:
          _context.t0 = _context.sent;
        case 11:
          isCompare = _context.t0;
          if (!(!user || !isCompare)) {
            _context.next = 15;
            break;
          }
          locals.error = _objectSpread(_objectSpread({}, !user && {
            user: "사용자가 존제하지 않습니다."
          }), !isCompare && user && {
            user: "사용자 비밀번호가 맞지 않습니다."
          });
          return _context.abrupt("return", res.status(400).render("users/signin"));
        case 15:
          session.loggedIn = true;
          session.user = user;
          return _context.abrupt("return", res.redirect("/"));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function postSignin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var signup = exports.signup = function signup(_, res) {
  var locals = res.locals;
  locals.pageTitle = "Sign up";
  return res.render("users/signup");
};
var postSignup = exports.postSignup = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var locals, _req$body2, name, email, username, password, password2, location, isUser;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          locals = res.locals;
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, username = _req$body2.username, password = _req$body2.password, password2 = _req$body2.password2, location = _req$body2.location;
          locals.pageTitle = "Sign up";
          locals.formData = {
            name: name,
            email: email,
            username: username,
            location: location
          };
          _context2.next = 6;
          return _user["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 6:
          isUser = _context2.sent;
          if (!(isUser || password !== password2)) {
            _context2.next = 10;
            break;
          }
          locals.error = _objectSpread(_objectSpread({}, password !== password2 && {
            password: "비밀번호가 서로 일치하지 않습니다."
          }), isUser && {
            user: "이름이나 이메일 중 이미 존제합니다."
          });
          return _context2.abrupt("return", res.status(400).render("users/signup"));
        case 10:
          _context2.prev = 10;
          _context2.next = 13;
          return _user["default"].create({
            name: name,
            email: email,
            username: username,
            password: password,
            location: location,
            avatarUrl: "",
            videos: [],
            comments: []
          });
        case 13:
          return _context2.abrupt("return", res.redirect("/signin"));
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](10);
          locals.error = {
            message: "계정 생성에 실패하였습니다."
          };
          return _context2.abrupt("return", res.status(400).render("users/signup"));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[10, 16]]);
  }));
  return function postSignup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var signout = exports.signout = function signout(req, res) {
  req.session.destroy(function () {});
  return res.redirect("/");
};
var ghSignin = exports.ghSignin = function ghSignin(_, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var params = new _url.URLSearchParams({
    client_id: process.env.GH_OAUTH_ID,
    allow_signup: "false",
    scope: "read:user user:email"
  }).toString();
  return res.redirect("".concat(baseUrl, "?").concat(params));
};
var ghSigninAccess = exports.ghSigninAccess = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var session, code, _emails$find, baseUrl, params, _yield$fetch$then, access_token, token_type, apiUrl, _yield$fetch$then2, avatarUrl, name, username, location, emails, _ref4, email, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          session = req.session, code = req.query.code;
          _context3.prev = 1;
          baseUrl = "https://github.com/login/oauth/access_token";
          params = new _url.URLSearchParams({
            client_id: process.env.GH_OAUTH_ID,
            client_secret: process.env.GH_OAUTH_SECRET,
            code: code + ""
          }).toString();
          _context3.next = 6;
          return fetch("".concat(baseUrl, "?").concat(params), {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          }).then(function (data) {
            return data.json();
          });
        case 6:
          _yield$fetch$then = _context3.sent;
          access_token = _yield$fetch$then.access_token;
          token_type = _yield$fetch$then.token_type;
          if (access_token) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.redirect("/signin"));
        case 11:
          apiUrl = "https://api.github.com";
          _context3.next = 14;
          return fetch("".concat(apiUrl, "/user"), {
            headers: {
              Authorization: "".concat(token_type, " ").concat(access_token)
            }
          }).then(function (data) {
            return data.json();
          });
        case 14:
          _yield$fetch$then2 = _context3.sent;
          avatarUrl = _yield$fetch$then2.avatar_url;
          name = _yield$fetch$then2.name;
          username = _yield$fetch$then2.login;
          location = _yield$fetch$then2.location;
          _context3.next = 21;
          return fetch("".concat(apiUrl, "/user/emails"), {
            headers: {
              Authorization: "".concat(token_type, " ").concat(access_token)
            }
          }).then(function (data) {
            return data.json();
          });
        case 21:
          emails = _context3.sent;
          _ref4 = (_emails$find = emails.find(function (_ref5) {
            var primary = _ref5.primary,
              verified = _ref5.verified;
            return primary && verified;
          })) !== null && _emails$find !== void 0 ? _emails$find : {}, email = _ref4.email;
          if (email) {
            _context3.next = 25;
            break;
          }
          return _context3.abrupt("return", res.redirect("/signin"));
        case 25:
          _context3.next = 27;
          return _user["default"].findOne({
            email: email
          });
        case 27:
          user = _context3.sent;
          if (user) {
            _context3.next = 32;
            break;
          }
          _context3.next = 31;
          return _user["default"].create({
            username: username,
            email: email,
            name: name,
            avatarUrl: avatarUrl,
            location: location,
            password: "",
            socialOnly: true,
            videos: [],
            comments: []
          });
        case 31:
          user = _context3.sent;
        case 32:
          session.loggedIn = true;
          session.user = user;
          return _context3.abrupt("return", res.redirect("/"));
        case 37:
          _context3.prev = 37;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
        case 40:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 37]]);
  }));
  return function ghSigninAccess(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var profile = exports.profile = function profile(_, res) {
  var locals = res.locals;
  locals.pageTitle = "User Profile";
  return res.render("users/profile");
};
var postProfile = exports.postProfile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var locals, _req$body3, name, email, username, location, file, user, isEmail, isUsername, fileUrl, isFile, avatarUrl, updateUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          locals = res.locals;
          _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, username = _req$body3.username, location = _req$body3.location, file = req.file, user = req.user;
          locals.pageTitle = "User Profile";
          _context4.t0 = user.email !== email;
          if (!_context4.t0) {
            _context4.next = 8;
            break;
          }
          _context4.next = 7;
          return _user["default"].exists({
            email: email
          });
        case 7:
          _context4.t0 = _context4.sent;
        case 8:
          isEmail = _context4.t0;
          _context4.t1 = user.username !== username;
          if (!_context4.t1) {
            _context4.next = 14;
            break;
          }
          _context4.next = 13;
          return _user["default"].exists({
            username: username
          });
        case 13:
          _context4.t1 = _context4.sent;
        case 14:
          isUsername = _context4.t1;
          if (!(isEmail || isUsername)) {
            _context4.next = 18;
            break;
          }
          locals.error = {
            user: "이름이나 이메일 중 이미 존제합니다."
          };
          return _context4.abrupt("return", res.status(400).render("users/profile"));
        case 18:
          fileUrl = isDev ? file === null || file === void 0 ? void 0 : file.path : file === null || file === void 0 ? void 0 : file.location;
          isFile = typeof fileUrl !== "undefined";
          _context4.t2 = isFile && user.avatarUrl;
          if (!_context4.t2) {
            _context4.next = 28;
            break;
          }
          if (!isDev) {
            _context4.next = 26;
            break;
          }
          _fs["default"].rmSync(user.avatarUrl);
          _context4.next = 28;
          break;
        case 26:
          _context4.next = 28;
          return (0, _multer.removeFile)(user.avatarUrl);
        case 28:
          avatarUrl = isFile ? fileUrl : user.avatarUrl;
          _context4.next = 31;
          return _user["default"].findByIdAndUpdate(user.id, {
            avatarUrl: avatarUrl,
            name: name,
            email: email,
            username: username,
            location: location
          }, {
            "new": true
          });
        case 31:
          updateUser = _context4.sent;
          req.session.user = updateUser;
          return _context4.abrupt("return", res.redirect("profile"));
        case 34:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postProfile(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();
var changePassword = exports.changePassword = function changePassword(_, res) {
  var locals = res.locals;
  locals.pageTitle = "Change Password";
  return res.render("users/change-password");
};
var postChangePassword = exports.postChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body4, curPassword, password, password2, user, locals, isCompare;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body4 = req.body, curPassword = _req$body4.curPassword, password = _req$body4.password, password2 = _req$body4.password2, user = req.user;
          locals = res.locals;
          locals.pageTitle = "Change Password";
          _context5.next = 5;
          return _bcrypt["default"].compare(curPassword, user.password);
        case 5:
          isCompare = _context5.sent;
          if (!(!isCompare || password !== password2)) {
            _context5.next = 9;
            break;
          }
          locals.error = _objectSpread(_objectSpread({}, !isCompare && {
            password: "기존 비밀번호가 맞지 않습니다."
          }), password !== password2 && {
            password: "새로운 비밀번호가 서로 맞지 않습니다."
          });
          return _context5.abrupt("return", res.status(400).render("users/change-password"));
        case 9:
          user.password = password;
          user.save();
          req.session.destroy(function () {});
          return _context5.abrupt("return", res.redirect("/signin"));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function postChangePassword(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();
var summary = exports.summary = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var locals;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          locals = res.locals;
          locals.pageTitle = "User Summary";
          locals.user = req.user;
          return _context6.abrupt("return", res.render("users/summary"));
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function summary(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();