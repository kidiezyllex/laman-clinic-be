"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MedicineWarehouseSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  medications: [{
    type: String,
    ref: "Medication"
  }]
});
const MedicineWarehouse = _mongoose.default.model("MedicineWarehouse", MedicineWarehouseSchema);
var _default = exports.default = MedicineWarehouse;