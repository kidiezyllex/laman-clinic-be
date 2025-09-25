"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointmentById = exports.getOneAppointmentById = exports.getListAppointments = exports.deleteAppointmentById = exports.createAppointment = void 0;
var _Appointment = _interopRequireDefault(require("../models/Appointment.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAppointment = async appointmentData => {
  const appointment = new _Appointment.default(appointmentData);
  return await appointment.save();
};
exports.createAppointment = createAppointment;
const getListAppointments = async () => {
  return await _Appointment.default.find().populate("patientId").populate("doctorId");
};
exports.getListAppointments = getListAppointments;
const getOneAppointmentById = async id => {
  return await _Appointment.default.findById(id).populate("patientId").populate("doctorId");
};
exports.getOneAppointmentById = getOneAppointmentById;
const updateAppointmentById = async (id, updateData) => {
  return await _Appointment.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = async id => {
  return await _Appointment.default.findByIdAndDelete(id);
};
exports.deleteAppointmentById = deleteAppointmentById;