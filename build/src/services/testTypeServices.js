"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestTypeByIdService = exports.getTestTypeByEmail = exports.getOneTestTypeByIdService = exports.getListTestTypesService = exports.deleteTestTypeByIdService = exports.createTestTypeService = void 0;
var _testTypeRepository = require("../repositories/testTypeRepository.js");
const createTestTypeService = async testTypeData => {
  try {
    return await (0, _testTypeRepository.createTestType)(testTypeData);
  } catch (error) {
    throw new Error("Error creating testType: " + error.message);
  }
};
exports.createTestTypeService = createTestTypeService;
const getTestTypeByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _testTypeRepository.findTestType)(query);
};
exports.getTestTypeByEmail = getTestTypeByEmail;
const getListTestTypesService = async () => {
  try {
    return await (0, _testTypeRepository.getListTestTypes)();
  } catch (error) {
    throw new Error("Error fetching TestType list: " + error.message);
  }
};
exports.getListTestTypesService = getListTestTypesService;
const getOneTestTypeByIdService = async id => {
  try {
    const testType = await (0, _testTypeRepository.getOneTestTypeById)(id);
    if (!testType) {
      throw new Error("TestType not found");
    }
    return testType;
  } catch (error) {
    throw new Error("Error fetching TestType: " + error.message);
  }
};
exports.getOneTestTypeByIdService = getOneTestTypeByIdService;
const updateTestTypeByIdService = async (id, updateData) => {
  try {
    const updatedTestType = await (0, _testTypeRepository.updateTestTypeById)(id, updateData);
    if (!updatedTestType) {
      throw new Error("TestType not found");
    }
    return updatedTestType;
  } catch (error) {
    throw new Error("Error updating TestType: " + error.message);
  }
};
exports.updateTestTypeByIdService = updateTestTypeByIdService;
const deleteTestTypeByIdService = async id => {
  try {
    const deletedTestType = await (0, _testTypeRepository.deleteTestTypeById)(id);
    if (!deletedTestType) {
      throw new Error("TestType not found");
    }
    return deletedTestType;
  } catch (error) {
    throw new Error("Error deleting TestType: " + error.message);
  }
};
exports.deleteTestTypeByIdService = deleteTestTypeByIdService;