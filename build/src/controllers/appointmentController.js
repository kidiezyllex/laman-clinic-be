"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointmentController = exports.listAppointmentsController = exports.getAppointmentByIdController = exports.deleteAppointmentController = exports.createAppointmentController = void 0;
var _appointmentServices = require("../services/appointmentServices.js");
// Tạo cuộc hẹn mới
const createAppointmentController = async (req, res) => {
  try {
    const appointment = await (0, _appointmentServices.createAppointments)(req.body);
    res.status(200).json({
      message: "Yêu cầu cuộc hẹn đã được tiếp nhận và đang xử lý",
      appointment
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Lấy danh sách cuộc hẹn
exports.createAppointmentController = createAppointmentController;
const listAppointmentsController = async (req, res) => {
  try {
    const appointments = await (0, _appointmentServices.listAppointments)();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Lấy chi tiết một cuộc hẹn
exports.listAppointmentsController = listAppointmentsController;
const getAppointmentByIdController = async (req, res) => {
  try {
    const appointment = await (0, _appointmentServices.getAppointmentById)(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Cập nhật thông tin cuộc hẹn
exports.getAppointmentByIdController = getAppointmentByIdController;
const updateAppointmentController = async (req, res) => {
  try {
    const appointment = await (0, _appointmentServices.updateAppointment)(req.params.id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Xóa cuộc hẹn
exports.updateAppointmentController = updateAppointmentController;
const deleteAppointmentController = async (req, res) => {
  try {
    const appointment = await (0, _appointmentServices.deleteAppointment)(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.deleteAppointmentController = deleteAppointmentController;