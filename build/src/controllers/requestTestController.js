"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRequestTestByIdController = exports.getOneRequestTestByIdController = exports.getListRequestTestsController = exports.deleteRequestTestByIdController = exports.createRequestTestController = exports.checkRequestTestController = void 0;
var _receptionistServices = require("../services/receptionistServices.js");
var _requestTestServices = require("../services/requestTestServices.js");
const createRequestTestController = async (req, res) => {
  try {
    const newRequestTest = await (0, _requestTestServices.createRequestTestService)(req.body);
    res.status(201).json({
      success: true,
      message: "Request test created successfully",
      data: newRequestTest
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createRequestTestController = createRequestTestController;
const getListRequestTestsController = async (req, res) => {
  try {
    const requestTests = await (0, _requestTestServices.getListRequestTestsService)();
    res.status(200).json(requestTests);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListRequestTestsController = getListRequestTestsController;
const getOneRequestTestByIdController = async (req, res) => {
  try {
    const requestTest = await (0, _requestTestServices.getOneRequestTestByIdService)(req.params.id);
    res.status(200).json(requestTest);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneRequestTestByIdController = getOneRequestTestByIdController;
const updateRequestTestByIdController = async (req, res) => {
  try {
    const updatedRequestTest = await (0, _requestTestServices.updateRequestTestByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Request test updated successfully",
      data: updatedRequestTest
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateRequestTestByIdController = updateRequestTestByIdController;
const deleteRequestTestByIdController = async (req, res) => {
  try {
    await (0, _requestTestServices.deleteRequestTestByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Request test deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteRequestTestByIdController = deleteRequestTestByIdController;
const checkRequestTestController = async (req, res) => {
  try {
    const {
      doctorId
    } = req.query;
    if (!doctorId) {
      return res.status(400).json({
        message: "doctorId is required"
      });
    }
    const appointmentIds = await (0, _requestTestServices.getAppointmentIdsForDoctor)(doctorId);
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
exports.checkRequestTestController = checkRequestTestController;