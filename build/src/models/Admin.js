"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Schedule = _interopRequireDefault(require("./Schedule.js"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `QTV-${randomString}`;
}
const AdminSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  role: {
    type: String,
    required: true
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
    unique: true,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  schedule: [_Schedule.default],
  address: {
    type: String
  }
});
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await _bcryptjs.default.hash(this.password, 12);
  next();
});
AdminSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAdmin = await _mongoose.default.models.Admin.findOne({
        _id: uniqueId
      });
      isUnique = !existingAdmin; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await _bcryptjs.default.compare(candidatePassword, this.password);
};
const Admin = _mongoose.default.model("Admin", AdminSchema);
var _default = exports.default = Admin;