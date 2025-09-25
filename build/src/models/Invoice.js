"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `HD-${randomString}`;
}
const invoiceSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Credit Card", "Bank Transfer", "Insurance"]
  },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Cancelled"],
    default: "Pending"
  },
  type: {
    type: String
  },
  image: {
    type: String
  },
  staffId: {
    type: String
  },
  staffRole: {
    type: String
  },
  patientId: {
    type: String
  },
  doctorId: {
    type: String
  },
  receptionistId: {
    type: String
  }
}, {
  timestamps: true
});

// Middleware để tạo ID hóa đơn trước khi lưu
invoiceSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingInvoice = await _mongoose.default.models.Invoice.findOne({
        _id: uniqueId
      });
      isUnique = !existingInvoice;
    }
    this._id = uniqueId;
  }
  next();
});
const Invoice = _mongoose.default.model("Invoice", invoiceSchema);
var _default = exports.default = Invoice;