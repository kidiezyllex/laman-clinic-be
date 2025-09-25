"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `RT-${randomString}`;
}
const testTypeSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  testName: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  }
});
const requestTestSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  testTypes: [testTypeSchema],
  patientId: {
    type: String,
    ref: "Patient",
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now()
  },
  reason: {
    type: String
  },
  isTestInvoiceCreated: {
    type: Boolean,
    default: false
  },
  appointmentId: {
    type: String
  }
});
requestTestSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await _mongoose.default.models.RequestTest.findOne({
        _id: uniqueId
      });
      isUnique = !existingDoctor;
    }
    this._id = uniqueId;
  }
  next();
});
const RequestTest = _mongoose.default.model("RequestTest", requestTestSchema);
var _default = exports.default = RequestTest;