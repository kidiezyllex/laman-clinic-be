"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ClinicSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  departments: {
    type: String,
    ref: "Department"
  },
  doctors: [{
    type: String,
    ref: "Doctor"
  }],
  pharmacists: [{
    type: String,
    ref: "Pharmacist"
  }]
});
const Clinic = _mongoose.default.model("Clinic", ClinicSchema);
var _default = exports.default = Clinic;