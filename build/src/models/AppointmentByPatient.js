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
  return `CH-Online-${randomString}`;
}
const appointmentByPatientSchema = new _mongoose.default.Schema({
  _id: {
    type: String,
    auto: false
  },
  fullName: {
    type: String
  },
  appointmentDateByPatient: {
    type: Date
  },
  doctorId: {
    type: String,
    ref: "Doctor"
  },
  patientId: {
    type: String,
    ref: "Patient"
  },
  reason: {
    type: String
  },
  specialization: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  reExamination: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
appointmentByPatientSchema.pre('save', async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingAppointment = await _mongoose.default.models.AppointmentByPatient.findOne({
        _id: uniqueId
      });
      isUnique = !existingAppointment; // Kiểm tra xem ID có tồn tại không
    }
    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});
const AppointmentByPatient = _mongoose.default.model("AppointmentByPatient", appointmentByPatientSchema);
var _default = exports.default = AppointmentByPatient;