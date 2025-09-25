"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
const TestType = _mongoose.default.model("TestType", testTypeSchema);
var _default = exports.default = TestType;