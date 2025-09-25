"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// models/Appointment.js

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `CH-${randomString}`;
}
const appointmentSchema = new _mongoose.default.Schema({
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
    ref: "Doctor"
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled"
  },
  specialization: {
    type: String,
    required: true
  },
  priority: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
appointmentSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAppointment = await _mongoose.default.models.Appointment.findOne({
        _id: uniqueId
      });
      isUnique = !existingAppointment; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});
const Appointment = _mongoose.default.model("Appointment", appointmentSchema);
var _default = exports.default = Appointment;