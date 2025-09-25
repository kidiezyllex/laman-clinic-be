"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _Schedule = _interopRequireDefault(require("../models/Schedule.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Đảm bảo đường dẫn là chính xác

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `YTXN-${randomString}`;
}
const laboratoryTechnicianSchema = new _mongoose.default.Schema({
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
  specialization: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  numberId: {
    type: String
  },
  labTest: {
    type: String,
    ref: "LabTest"
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
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  schedule: [_Schedule.default],
  // Sử dụng đúng cách schema cho lịch trình
  isOnline: {
    type: Boolean,
    default: false
  },
  labTestNumber: {
    type: String,
    default: "XN-000"
  }
}, {
  timestamps: true
});
laboratoryTechnicianSchema.index({
  email: 1
}, {
  unique: true
});
laboratoryTechnicianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await _bcryptjs.default.hash(this.password, 12);
  next();
});
laboratoryTechnicianSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await _mongoose.default.models.LaboratoryTechnicianSchema.findOne({
        _id: uniqueId
      });
      isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
laboratoryTechnicianSchema.methods.comparePassword = async function (candidatePassword) {
  return await _bcryptjs.default.compare(candidatePassword, this.password);
};
const LaboratoryTechnician = _mongoose.default.model("LaboratoryTechnician", laboratoryTechnicianSchema);
var _default = exports.default = LaboratoryTechnician;