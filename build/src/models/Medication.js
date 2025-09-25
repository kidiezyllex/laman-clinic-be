"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `TH-${randomString}`;
}
const medicationSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  medicationName: {
    type: String,
    required: true
  },
  quantityImported: {
    type: Number
  },
  quantityRemaining: {
    type: Number
  },
  dosage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  instructions: {
    type: String
  },
  expirationDate: {
    type: Date
  }
});
medicationSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingMedication = await _mongoose.default.models.Medication.findOne({
        _id: uniqueId
      });
      isUnique = !existingMedication;
    }
    this._id = uniqueId;
  }
  next();
});
const Medication = _mongoose.default.model("Medication", medicationSchema);
var _default = exports.default = Medication;