"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDiagnosisByIdController = exports.getOneDiagnosisByIdController = exports.getListDiagnosesController = exports.deleteDiagnosisByIdController = exports.createDiagnosisController = void 0;
var _diagnosisServices = require("../services/diagnosisServices.js");
const createDiagnosisController = async (req, res) => {
  try {
    const newDiagnosis = await (0, _diagnosisServices.createDiagnosisService)(req.body);
    res.status(201).json({
      success: true,
      message: "Diagnosis created successfully",
      data: newDiagnosis
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createDiagnosisController = createDiagnosisController;
const getListDiagnosesController = async (req, res) => {
  try {
    const diagnoses = await (0, _diagnosisServices.getListDiagnosesService)();
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListDiagnosesController = getListDiagnosesController;
const getOneDiagnosisByIdController = async (req, res) => {
  try {
    const diagnosis = await (0, _diagnosisServices.getOneDiagnosisByIdService)(req.params.id);
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneDiagnosisByIdController = getOneDiagnosisByIdController;
const updateDiagnosisByIdController = async (req, res) => {
  try {
    const updatedDiagnosis = await (0, _diagnosisServices.updateDiagnosisByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Diagnosis updated successfully",
      data: updatedDiagnosis
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateDiagnosisByIdController = updateDiagnosisByIdController;
const deleteDiagnosisByIdController = async (req, res) => {
  try {
    await (0, _diagnosisServices.deleteDiagnosisByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Diagnosis deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteDiagnosisByIdController = deleteDiagnosisByIdController;