"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRequestTestByIdService = exports.getOneRequestTestByIdService = exports.getListRequestTestsService = exports.getAppointmentIdsForDoctor = exports.deleteRequestTestByIdService = exports.createRequestTestService = void 0;
var _requestTestRepository = require("../repositories/requestTestRepository.js");
const createRequestTestService = async requestTestData => {
  try {
    return await (0, _requestTestRepository.createRequestTest)(requestTestData);
  } catch (error) {
    throw new Error("Error creating request test: " + error.message);
  }
};
exports.createRequestTestService = createRequestTestService;
const getListRequestTestsService = async () => {
  try {
    return await (0, _requestTestRepository.getListRequestTests)();
  } catch (error) {
    throw new Error("Error fetching request test list: " + error.message);
  }
};
exports.getListRequestTestsService = getListRequestTestsService;
const getOneRequestTestByIdService = async id => {
  try {
    const requestTest = await (0, _requestTestRepository.getOneRequestTestById)(id);
    if (!requestTest) {
      throw new Error("Request test not found");
    }
    return requestTest;
  } catch (error) {
    throw new Error("Error fetching request test: " + error.message);
  }
};
exports.getOneRequestTestByIdService = getOneRequestTestByIdService;
const updateRequestTestByIdService = async (id, updateData) => {
  try {
    const updatedRequestTest = await (0, _requestTestRepository.updateRequestTestById)(id, updateData);
    if (!updatedRequestTest) {
      throw new Error("Request test not found");
    }
    return updatedRequestTest;
  } catch (error) {
    throw new Error("Error updating request test: " + error.message);
  }
};
exports.updateRequestTestByIdService = updateRequestTestByIdService;
const deleteRequestTestByIdService = async id => {
  try {
    const deletedRequestTest = await (0, _requestTestRepository.deleteRequestTestById)(id);
    if (!deletedRequestTest) {
      throw new Error("Request test not found");
    }
    return deletedRequestTest;
  } catch (error) {
    throw new Error("Error deleting request test: " + error.message);
  }
};
exports.deleteRequestTestByIdService = deleteRequestTestByIdService;
const getAppointmentIdsForDoctor = async doctorId => {
  return await (0, _requestTestRepository.getAppointmentIdsByDoctorId)(doctorId);
};
exports.getAppointmentIdsForDoctor = getAppointmentIdsForDoctor;