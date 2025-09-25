"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePrescriptionByIdController = exports.getOnePrescriptionByIdController = exports.getMedicationFluctuationsController = exports.getListPrescriptionsController = exports.getAppointmentIdsByDoctorController = exports.deletePrescriptionByIdController = exports.createPrescriptionController = exports.completePrescriptionController = exports.checkPrescriptionController = void 0;
var _prescriptionServices = require("../services/prescriptionServices.js");
var _receptionistServices = require("../services/receptionistServices.js");
const createPrescriptionController = async (req, res) => {
  try {
    const newPrescription = await (0, _prescriptionServices.createPrescriptionService)(req.body);
    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: newPrescription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createPrescriptionController = createPrescriptionController;
const getListPrescriptionsController = async (req, res) => {
  try {
    const {
      appointmentId
    } = req.query;
    if (appointmentId) {
      const prescription = await (0, _prescriptionServices.getOnePrescriptionByAppointmentIdService)(appointmentId);
      res.status(200).json(prescription);
    } else {
      const prescriptions = await (0, _prescriptionServices.getListPrescriptionsService)();
      res.status(200).json(prescriptions);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListPrescriptionsController = getListPrescriptionsController;
const checkPrescriptionController = async (req, res) => {
  try {
    const {
      appointmentId
    } = req.query;
    if (!appointmentId) {
      return res.status(400).json({
        error: "appointmentId is required"
      });
    }
    const exists = await (0, _prescriptionServices.checkPrescriptionByAppointmentIdService)(appointmentId);
    res.json({
      exists
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.checkPrescriptionController = checkPrescriptionController;
const getOnePrescriptionByIdController = async (req, res) => {
  try {
    const prescription = await (0, _prescriptionServices.getOnePrescriptionByIdService)(req.params.id);
    res.status(200).json(prescription);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOnePrescriptionByIdController = getOnePrescriptionByIdController;
const updatePrescriptionByIdController = async (req, res) => {
  try {
    const updatedPrescription = await (0, _prescriptionServices.updatePrescriptionByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: updatedPrescription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updatePrescriptionByIdController = updatePrescriptionByIdController;
const deletePrescriptionByIdController = async (req, res) => {
  try {
    await (0, _prescriptionServices.deletePrescriptionByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deletePrescriptionByIdController = deletePrescriptionByIdController;
const completePrescriptionController = async (req, res) => {
  try {
    const {
      prescriptionId,
      warehouseId
    } = req.body;
    const completedPrescription = await (0, _prescriptionServices.completePrescriptionService)(prescriptionId, warehouseId);
    res.status(200).json({
      success: true,
      message: "Prescription completed successfully",
      data: completedPrescription
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.completePrescriptionController = completePrescriptionController;
const getMedicationFluctuationsController = async (req, res) => {
  try {
    const fluctuations = await (0, _receptionistServices.getMedicationFluctuationsService)();
    res.status(200).json(fluctuations);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getMedicationFluctuationsController = getMedicationFluctuationsController;
const getAppointmentIdsByDoctorController = async (req, res) => {
  try {
    const {
      doctorId
    } = req.query;
    if (!doctorId) {
      return res.status(400).json({
        error: "doctorId is required"
      });
    }
    const appointmentIds = await (0, _prescriptionServices.getAppointmentIdsByDoctorIdService)(doctorId);
    res.json(appointmentIds);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
exports.getAppointmentIdsByDoctorController = getAppointmentIdsByDoctorController;