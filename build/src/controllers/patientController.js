"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePatientByIdController = exports.getOnePatientByIdController = exports.getOnePatientByEmailController = exports.getOnePatientByClerkIdController = exports.getListPatientsController = exports.deletePatientByIdController = exports.createPatientController = void 0;
var _patientServices = require("../services/patientServices.js");
const createPatientController = async (req, res) => {
  try {
    const newPatient = await (0, _patientServices.createPatientService)(req.body);
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createPatientController = createPatientController;
const getOnePatientByEmailController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    const patient = await (0, _patientServices.getPatientByEmail)(email);
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server nội bộ"
    });
  }
};
exports.getOnePatientByEmailController = getOnePatientByEmailController;
const getListPatientsController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const patient = await (0, _patientServices.getPatientByEmail)(email);
      res.status(200).json(patient);
    } else {
      const patients = await (0, _patientServices.getListPatientsService)();
      res.status(200).json(patients);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListPatientsController = getListPatientsController;
const getOnePatientByIdController = async (req, res) => {
  try {
    const patient = await (0, _patientServices.getOnePatientByIdService)(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOnePatientByIdController = getOnePatientByIdController;
const getOnePatientByClerkIdController = async (req, res) => {
  try {
    const patient = await (0, _patientServices.getPatientByClerkId)(req.params.clerkId);
    res.status(200).json(patient);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOnePatientByClerkIdController = getOnePatientByClerkIdController;
const updatePatientByIdController = async (req, res) => {
  try {
    const updatedPatient = await (0, _patientServices.updatePatientByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updatePatientByIdController = updatePatientByIdController;
const deletePatientByIdController = async (req, res) => {
  try {
    await (0, _patientServices.deletePatientByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deletePatientByIdController = deletePatientByIdController;