"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointmentById = exports.getOneAppointmentById = exports.getListAppointments = exports.deleteAppointmentById = exports.createAppointmentByPatientRepo = void 0;
var _AppointmentByPatient = _interopRequireDefault(require("../models/AppointmentByPatient.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAppointmentByPatientRepo = async appointmentData => {
  const appointment = new _AppointmentByPatient.default(appointmentData);
  return await appointment.save();
};
exports.createAppointmentByPatientRepo = createAppointmentByPatientRepo;
const getListAppointments = async () => {
  return await _AppointmentByPatient.default.find().populate("patientId").populate("doctorId");
};
exports.getListAppointments = getListAppointments;
const getOneAppointmentById = async id => {
  return await _AppointmentByPatient.default.findById(id).populate("patientId").populate("doctorId");
};
exports.getOneAppointmentById = getOneAppointmentById;
const updateAppointmentById = async (id, updateData) => {
  return await _AppointmentByPatient.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateAppointmentById = updateAppointmentById;
const deleteAppointmentById = async id => {
  return await _AppointmentByPatient.default.findByIdAndDelete(id);
};
exports.deleteAppointmentById = deleteAppointmentById;