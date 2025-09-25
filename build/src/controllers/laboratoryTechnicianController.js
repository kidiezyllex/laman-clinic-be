"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLaboratoryTechnicianController = exports.getListTest = exports.getListLaboratoryTechniciansController = exports.getLaboratoryTechnicianByIdController = exports.deleteLaboratoryTechnicianController = exports.createLaboratoryTechnicianController = void 0;
var _laboratoryTechnicianServices = require("../services/laboratoryTechnicianServices.js");
// Tạo một laboratory technician mới
const createLaboratoryTechnicianController = async (req, res) => {
  try {
    const technician = await (0, _laboratoryTechnicianServices.createLaboratoryTechnicians)(req.body);
    res.status(201).json(technician);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Lấy danh sách laboratory technicians
exports.createLaboratoryTechnicianController = createLaboratoryTechnicianController;
const getListLaboratoryTechniciansController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const technicians = await (0, _laboratoryTechnicianServices.getLaboratoryTechnicianByEmail)(email);
      res.status(200).json(technicians);
    } else {
      const technicians = await (0, _laboratoryTechnicianServices.getListLaboratoryTechniciansService)();
      res.status(200).json(technicians);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Lấy chi tiết một laboratory technician
exports.getListLaboratoryTechniciansController = getListLaboratoryTechniciansController;
const getLaboratoryTechnicianByIdController = async (req, res) => {
  try {
    const technician = await (0, _laboratoryTechnicianServices.getLaboratoryTechnicianById)(req.params.id);
    res.status(200).json(technician);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Cập nhật thông tin laboratory technician
exports.getLaboratoryTechnicianByIdController = getLaboratoryTechnicianByIdController;
const updateLaboratoryTechnicianController = async (req, res) => {
  try {
    const technician = await (0, _laboratoryTechnicianServices.updateLaboratoryTechnician)(req.params.id, req.body);
    res.status(200).json(technician);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Xóa laboratory technician
exports.updateLaboratoryTechnicianController = updateLaboratoryTechnicianController;
const deleteLaboratoryTechnicianController = async (req, res) => {
  try {
    await (0, _laboratoryTechnicianServices.deleteLaboratoryTechnician)(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.deleteLaboratoryTechnicianController = deleteLaboratoryTechnicianController;
const getListTest = async (req, res) => {
  try {
    const appointment = await getAppointmentToQueue(req.params.roomNumber);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.getListTest = getListTest;