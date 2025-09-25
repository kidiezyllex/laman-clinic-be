"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prescriptionByIdController = exports.listPrescriptionsController = exports.getOnePharmacistByIdController = exports.getListPharmacistsController = exports.createPrescriptionBillController = exports.createPharmacistController = exports.completePrescriptionController = void 0;
var _pharmacistServices = require("../services/pharmacistServices.js");
// Get all prescriptions from the queue
const listPrescriptionsController = async (req, res) => {
  try {
    const prescriptions = await (0, _pharmacistServices.getPrescriptionsFromQueue)();
    if (!prescriptions.length) {
      return res.status(404).json({
        success: false,
        message: "No prescription in queue"
      });
    }
    res.status(200).json({
      success: true,
      data: prescriptions
    });
  } catch (err) {
    console.error("Error retrieving patients from queue:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

// Create a new prescription bill
exports.listPrescriptionsController = listPrescriptionsController;
const createPrescriptionBillController = async (req, res) => {
  try {
    const savedBill = await (0, _pharmacistServices.createPrescriptionBill)(req.body);
    res.status(200).json(savedBill);
  } catch (error) {
    res.status(500).json({
      message: "Error creating prescription bill",
      error
    });
  }
};

// Get a specific prescription bill by ID
exports.createPrescriptionBillController = createPrescriptionBillController;
const prescriptionByIdController = async (req, res) => {
  try {
    const bill = await (0, _pharmacistServices.getPrescriptionBillById)(req.params.id);
    res.status(200).json(bill);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.prescriptionByIdController = prescriptionByIdController;
const completePrescriptionController = async (req, res) => {
  try {
    const prescriptionId = req.params.prescriptionId;
    const {
      warehouseId
    } = req.body; // Lấy dữ liệu từ request body

    const completedPrescription = await (0, _pharmacistServices.completePrescriptionService)(prescriptionId, warehouseId);
    res.status(200).json(completedPrescription);
  } catch (error) {
    console.error("Error completing prescription:", error);
    res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
};
exports.completePrescriptionController = completePrescriptionController;
const getListPharmacistsController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const pharmacist = await (0, _pharmacistServices.getPharmacistByEmail)(email);
      res.status(200).json(pharmacist);
    } else {
      const pharmacists = await (0, _pharmacistServices.getListPharmacistsService)();
      res.status(200).json(pharmacists);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListPharmacistsController = getListPharmacistsController;
const createPharmacistController = async (req, res) => {
  try {
    const newPharmacist = await (0, _pharmacistServices.createPharmacistService)(req.body);
    res.status(201).json({
      success: true,
      message: "Pharmacist created successfully",
      data: newPharmacist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createPharmacistController = createPharmacistController;
const getOnePharmacistByIdController = async (req, res) => {
  try {
    const pharmacist = await (0, _pharmacistServices.getOnePharmacistByIdService)(req.params.id);
    res.status(200).json(pharmacist);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOnePharmacistByIdController = getOnePharmacistByIdController;