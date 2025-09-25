"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Schema lịch sử bệnh
const medicalHistorySchema = new _mongoose.default.Schema({
  disease: {
    type: String,
    required: true
  },
  diagnosisDate: {
    type: Date,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  appointmentId: {
    type: String
  }
});
var _default = exports.default = medicalHistorySchema;