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
  return `DS-${randomString}`;
}
const pharmacistSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  fullName: {
    type: String
  },
  address: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true
  },
  phone: {
    type: String,
    // required: true,
    match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."]
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  schedule: [_Schedule.default]
}, {
  timestamps: true
});
pharmacistSchema.index({
  email: 1
}, {
  unique: true
});
pharmacistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await _bcryptjs.default.hash(this.password, 12);
  next();
});
pharmacistSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingPharmacist = await _mongoose.default.models.Pharmacist.findOne({
        _id: uniqueId
      });
      isUnique = !existingPharmacist; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
pharmacistSchema.methods.comparePassword = async function (candidatePassword) {
  return await _bcryptjs.default.compare(candidatePassword, this.password);
};
const Pharmacist = _mongoose.default.model("Pharmacist", pharmacistSchema);
var _default = exports.default = Pharmacist;