"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const serviceSchema = new _mongoose.default.Schema({
  serviceName: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});
const Services = _mongoose.default.model('Services', serviceSchema);
var _default = exports.default = Services;