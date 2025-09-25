"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestByIdService = exports.getPatientIdsForDoctor = exports.getOneTestByIdService = exports.getOneTestByAppointmentIdService = exports.getMostRecentTest = exports.getListTestsService = exports.deleteTestByIdService = exports.createTestService = void 0;
var _testRepository = require("../repositories/testRepository.js");
const createTestService = async testData => {
  try {
    return await (0, _testRepository.createTestRepo)(testData);
  } catch (error) {
    throw new Error("Error creating test: " + error.message);
  }
};
exports.createTestService = createTestService;
const getListTestsService = async () => {
  try {
    return await (0, _testRepository.getListTestsRepo)();
  } catch (error) {
    throw new Error("Error fetching test list: " + error.message);
  }
};
exports.getListTestsService = getListTestsService;
const getOneTestByIdService = async id => {
  try {
    const test = await (0, _testRepository.getOneTestByIdRepo)(id);
    if (!test) {
      throw new Error("Test not found");
    }
    return test;
  } catch (error) {
    throw new Error("Error fetching test: " + error.message);
  }
};
exports.getOneTestByIdService = getOneTestByIdService;
const updateTestByIdService = async (id, updateData) => {
  try {
    const updatedTest = await (0, _testRepository.updateTestByIdRepo)(id, updateData);
    if (!updatedTest) {
      throw new Error("Test not found");
    }
    return updatedTest;
  } catch (error) {
    throw new Error("Error updating test: " + error.message);
  }
};
exports.updateTestByIdService = updateTestByIdService;
const deleteTestByIdService = async id => {
  try {
    const deletedTest = await (0, _testRepository.deleteTestByIdRepo)(id);
    if (!deletedTest) {
      throw new Error("Test not found");
    }
    return deletedTest;
  } catch (error) {
    throw new Error("Error deleting test: " + error.message);
  }
};
exports.deleteTestByIdService = deleteTestByIdService;
const getPatientIdsForDoctor = async doctorId => {
  return await (0, _testRepository.getPatientIdsByDoctorIdRepo)(doctorId);
};
exports.getPatientIdsForDoctor = getPatientIdsForDoctor;
const getMostRecentTest = async (patientId, doctorId) => {
  const test = await (0, _testRepository.getMostRecentTestRepo)(patientId, doctorId);
  return test || null;
};
exports.getMostRecentTest = getMostRecentTest;
const getOneTestByAppointmentIdService = async appointmentId => {
  let query = {};
  if (appointmentId) {
    query.appointmentId = appointmentId;
  }
  return await (0, _testRepository.findTestByAppointmentId)(query);
};
exports.getOneTestByAppointmentIdService = getOneTestByAppointmentIdService;