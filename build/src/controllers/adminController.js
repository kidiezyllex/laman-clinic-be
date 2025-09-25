"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAdminByIdController = exports.getSpecializationStats = exports.getOneAdminByIdController = exports.getListAdminsController = exports.getCompletedAppointmentsByMonthController = exports.deleteAdminByIdController = exports.createAdminController = void 0;
var _adminServices = require("../services/adminServices.js");
const createAdminController = async (req, res) => {
  try {
    const newAdmin = await (0, _adminServices.createAdminService)(req.body);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: newAdmin
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createAdminController = createAdminController;
const getListAdminsController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const admin = await (0, _adminServices.getAdminByEmail)(email);
      res.status(200).json(admin);
    } else {
      const admins = await (0, _adminServices.getListAdminsService)();
      res.status(200).json(admins);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListAdminsController = getListAdminsController;
const getOneAdminByIdController = async (req, res) => {
  try {
    const admin = await (0, _adminServices.getOneAdminByIdService)(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneAdminByIdController = getOneAdminByIdController;
const updateAdminByIdController = async (req, res) => {
  try {
    const updatedAdmin = await (0, _adminServices.updateAdminByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: updatedAdmin
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateAdminByIdController = updateAdminByIdController;
const deleteAdminByIdController = async (req, res) => {
  try {
    await (0, _adminServices.deleteAdminByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteAdminByIdController = deleteAdminByIdController;
const getSpecializationStats = async (req, res) => {
  try {
    const stats = await (0, _adminServices.getAppointmentsBySpecializationService)();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
};
exports.getSpecializationStats = getSpecializationStats;
const getCompletedAppointmentsByMonthController = async (req, res) => {
  try {
    const stats = await (0, _adminServices.getCompletedAppointmentsByMonthService)(req.params.year);
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Lỗi server'
    });
  }
};

// getCompletedAppointmentsByMonthService
exports.getCompletedAppointmentsByMonthController = getCompletedAppointmentsByMonthController;