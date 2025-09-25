"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// models/User.js

const userSchema = new _mongoose.default.Schema({
  fullName: {
    type: String
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  phone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "receptionist", "pharmacist", "patient", "cashier", "laboratory-technician"],
    default: "patient"
  }
});

// Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await _bcryptjs.default.hash(this.password, 12);
  next();
});

// Phương thức để so sánh mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await _bcryptjs.default.compare(candidatePassword, this.password);
};
const User = _mongoose.default.model("User", userSchema);
var _default = exports.default = User;