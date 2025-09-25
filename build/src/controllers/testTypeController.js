"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestTypeByIdController = exports.getOneTestTypeByIdController = exports.getListTestTypesController = exports.deleteTestTypeByIdController = exports.createTestTypeController = void 0;
var _testTypeServices = require("../services/testTypeServices.js");
// testType TestType
const createTestTypeController = async (req, res) => {
  try {
    const newTestType = await (0, _testTypeServices.createTestTypeService)(req.body);
    res.status(201).json({
      success: true,
      message: "TestType created successfully",
      data: newTestType
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createTestTypeController = createTestTypeController;
const getListTestTypesController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const testType = await (0, _testTypeServices.getTestTypeByEmail)(email);
      res.status(200).json(testType);
    } else {
      const testTypes = await (0, _testTypeServices.getListTestTypesService)();
      res.status(200).json(testTypes);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListTestTypesController = getListTestTypesController;
const getOneTestTypeByIdController = async (req, res) => {
  try {
    const testType = await (0, _testTypeServices.getOneTestTypeByIdService)(req.params.id);
    res.status(200).json(testType);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneTestTypeByIdController = getOneTestTypeByIdController;
const updateTestTypeByIdController = async (req, res) => {
  try {
    const updatedTestType = await (0, _testTypeServices.updateTestTypeByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "TestType updated successfully",
      data: updatedTestType
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateTestTypeByIdController = updateTestTypeByIdController;
const deleteTestTypeByIdController = async (req, res) => {
  try {
    await (0, _testTypeServices.deleteTestTypeByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "TestType deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteTestTypeByIdController = deleteTestTypeByIdController;