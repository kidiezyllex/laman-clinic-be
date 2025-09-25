"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `K-${randomString}`;
}
const DepartmentSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  departmentName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  head: {
    type: String,
    ref: 'Doctor'
  },
  staff: [{
    type: String,
    ref: 'Doctor'
  }],
  clinic: {
    type: String,
    ref: 'Clinic',
    required: true
  }
});
DepartmentSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDepartment = await _mongoose.default.models.Department.findOne({
        _id: uniqueId
      });
      isUnique = !existingDepartment; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});
const Department = _mongoose.default.model('Department', DepartmentSchema);
var _default = exports.default = Department;