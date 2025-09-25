"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// models/Schedule.js

const scheduleSchema = new _mongoose.default.Schema({
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  startTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).']
  },
  endTime: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Please use a valid time format (HH:mm).']
  }
});

// Chỉ xuất schema, không cần tạo mô hình
var _default = exports.default = scheduleSchema;