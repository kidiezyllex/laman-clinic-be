"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestByIdController = exports.getOneTestByIdController = exports.getListTestsController = exports.deleteTestByIdController = exports.createTestController = exports.checkTestController = void 0;
var _testServices = require("../services/testServices.js");
const createTestController = async (req, res) => {
  try {
    const newTest = await (0, _testServices.createTestService)(req.body);
    res.status(201).json({
      success: true,
      message: "Test created successfully",
      data: newTest
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createTestController = createTestController;
const getListTestsController = async (req, res) => {
  try {
    const {
      appointmentId
    } = req.query;
    if (appointmentId) {
      const test = await (0, _testServices.getOneTestByAppointmentIdService)(appointmentId);
      res.status(200).json(test);
    } else {
      const test = await (0, _testServices.getListTestsService)();
      if (test) res.json(test);else res.json(null);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListTestsController = getListTestsController;
const getOneTestByIdController = async (req, res) => {
  try {
    const test = await (0, _testServices.getOneTestByIdService)(req.params.id);
    res.status(200).json(test);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneTestByIdController = getOneTestByIdController;
const updateTestByIdController = async (req, res) => {
  try {
    const updatedTest = await (0, _testServices.updateTestByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: updatedTest
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateTestByIdController = updateTestByIdController;
const deleteTestByIdController = async (req, res) => {
  try {
    await (0, _testServices.deleteTestByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Test deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteTestByIdController = deleteTestByIdController;
const checkTestController = async (req, res) => {
  try {
    const {
      doctorId
    } = req.query;
    if (!doctorId) {
      return res.status(400).json({
        message: "doctorId is required"
      });
    }
    const appointmentIds = await (0, _testServices.getPatientIdsForDoctor)(doctorId);
    res.json({
      appointmentIds
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
exports.checkTestController = checkTestController;