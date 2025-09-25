"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClinicController = exports.listClinicsController = exports.getClinicByIdController = exports.deleteClinicController = exports.createClinicController = void 0;
var _clinicServices = require("../services/clinicServices.js");
// Tạo một clinic mới
const createClinicController = async (req, res) => {
  try {
    const clinic = await (0, _clinicServices.createClinics)(req.body);
    res.status(200).json(clinic);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Lấy danh sách clinics
exports.createClinicController = createClinicController;
const listClinicsController = async (req, res) => {
  try {
    const clinics = await (0, _clinicServices.listClinics)();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Lấy chi tiết một clinic
exports.listClinicsController = listClinicsController;
const getClinicByIdController = async (req, res) => {
  try {
    const clinic = await (0, _clinicServices.getClinicById)(req.params.id);
    res.status(200).json(clinic);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Cập nhật thông tin clinic
exports.getClinicByIdController = getClinicByIdController;
const updateClinicController = async (req, res) => {
  try {
    const clinic = await (0, _clinicServices.updateClinic)(req.params.id, req.body);
    res.status(200).json(clinic);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Xóa clinic
exports.updateClinicController = updateClinicController;
const deleteClinicController = async (req, res) => {
  try {
    await (0, _clinicServices.deleteClinic)(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.deleteClinicController = deleteClinicController;