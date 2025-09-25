"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `HDT-${randomString}`;
}
const PrescriptionInvoiceSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  patientId: {
    type: String,
    ref: "Patient",
    required: true
  },
  doctorId: {
    type: String,
    ref: "Doctor",
    required: true
  },
  pharmacistId: {
    type: String,
    ref: "Pharmacist",
    required: true
  },
  prescriptionId: {
    type: String,
    ref: "Prescription",
    required: true
  },
  medications: [{
    type: String,
    ref: "Medication"
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  }
});
PrescriptionInvoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingPrescriptionBill = await _mongoose.default.models.PrescriptionBill.findOne({
        _id: uniqueId
      });
      isUnique = !existingPrescriptionBill; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});
const PrescriptionBill = _mongoose.default.model("prescriptionBill", PrescriptionInvoiceSchema);
var _default = exports.default = PrescriptionBill;