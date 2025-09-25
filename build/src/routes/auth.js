"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/authController.js");
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// routes/auth.js

const router = _express.default.Router();

// Đăng ký người dùng
router.post('/register', _authController.register);

// Đăng nhập
router.post('/login', _authController.loginUser);

// Đăng xuất
router.post('/logout', _authMiddleware.protect, _authController.logout);
var _default = exports.default = router;