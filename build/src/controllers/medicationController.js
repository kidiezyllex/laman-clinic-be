"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMedicationByIdController = exports.getOneMedicationByIdController = exports.getListMedicationsController = exports.deleteMedicationByIdController = exports.createMedicationController = void 0;
var _medicationServices = require("../services/medicationServices.js");
const createMedicationController = async (req, res) => {
  try {
    const newMedication = await (0, _medicationServices.createMedicationService)(req.body);
    res.status(201).json({
      success: true,
      message: "Medication created successfully",
      data: newMedication
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createMedicationController = createMedicationController;
const getListMedicationsController = async (req, res) => {
  try {
    const {
      medicationName
    } = req.query;
    if (medicationName) {
      const medication = await (0, _medicationServices.getMedicationByName)(medicationName);
      res.status(200).json(medication);
    } else {
      const medications = await (0, _medicationServices.getListMedicationsService)();
      res.status(200).json(medications);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListMedicationsController = getListMedicationsController;
const getOneMedicationByIdController = async (req, res) => {
  try {
    const medication = await (0, _medicationServices.getOneMedicationByIdService)(req.params.id);
    res.status(200).json(medication);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneMedicationByIdController = getOneMedicationByIdController;
const updateMedicationByIdController = async (req, res) => {
  try {
    const updatedMedication = await (0, _medicationServices.updateMedicationByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Medication updated successfully",
      data: updatedMedication
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateMedicationByIdController = updateMedicationByIdController;
const deleteMedicationByIdController = async (req, res) => {
  try {
    await (0, _medicationServices.deleteMedicationByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Medication deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteMedicationByIdController = deleteMedicationByIdController;