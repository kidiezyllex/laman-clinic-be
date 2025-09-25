"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointment = exports.listAppointments = exports.getAppointmentById = exports.deleteAppointment = exports.createAppointments = void 0;
var _messageQueue = require("../utils/messageQueue.js");
var _appointmentRepository = require("../repositories/appointmentRepository.js");
var _patientRepository = require("../repositories/patientRepository.js");
// appointmentService.js

// Create a new appointment
const createAppointments = async appointmentData => {
  const {
    patientId,
    appointmentDate,
    specialization,
    reason
  } = appointmentData;
  if (!patientId || !appointmentDate || !specialization || !reason) {
    throw new Error("patientId, appointmentDate và specialization, reason là bắt buộc");
  }
  const patient = await (0, _patientRepository.getOnePatientById)(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }
  const appointment = await (0, _appointmentRepository.createAppointment)(appointmentData);
  await _messageQueue.messageQueue.sendMessage(`department-${specialization}-queue`, appointment);
  return appointment;
};

// List all appointments
exports.createAppointments = createAppointments;
const listAppointments = async () => {
  return await (0, _appointmentRepository.getListAppointments)();
};

// Get details of a specific appointment
exports.listAppointments = listAppointments;
const getAppointmentById = async id => {
  const appointment = await (0, _appointmentRepository.getOneAppointmentById)(id);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Update an appointment
exports.getAppointmentById = getAppointmentById;
const updateAppointment = async (id, updateData) => {
  const appointment = await (0, _appointmentRepository.updateAppointmentById)(id, updateData);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};

// Delete an appointment
exports.updateAppointment = updateAppointment;
const deleteAppointment = async id => {
  const appointment = await (0, _appointmentRepository.deleteAppointmentById)(id);
  if (!appointment) throw new Error("Cuộc hẹn không tồn tại");
  return appointment;
};
exports.deleteAppointment = deleteAppointment;