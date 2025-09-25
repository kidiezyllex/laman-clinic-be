"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReceptionistByIdService = exports.getReceptionistByEmail = exports.getOneReceptionistByIdService = exports.getMedicationFluctuationsService = exports.getListReceptionistsService = exports.deleteReceptionistByIdService = exports.createReceptionistService = exports.checkRequestTestExistence = void 0;
var _prescriptionRepository = require("../repositories/prescriptionRepository.js");
var _receptionistRepository = require("../repositories/receptionistRepository.js");
var _requestTestRepository = require("../repositories/requestTestRepository.js");
// Receptionist, receptionist
const createReceptionistService = async receptionistData => {
  try {
    return await (0, _receptionistRepository.createReceptionist)(receptionistData);
  } catch (error) {
    throw new Error("Error creating: " + error.message);
  }
};
exports.createReceptionistService = createReceptionistService;
const getReceptionistByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _receptionistRepository.findReceptionist)(query);
};
exports.getReceptionistByEmail = getReceptionistByEmail;
const getListReceptionistsService = async () => {
  try {
    return await (0, _receptionistRepository.getListReceptionists)();
  } catch (error) {
    throw new Error("Error fetching list: " + error.message);
  }
};
exports.getListReceptionistsService = getListReceptionistsService;
const getOneReceptionistByIdService = async id => {
  try {
    const receptionist = await (0, _receptionistRepository.getOneReceptionistById)(id);
    if (!receptionist) {
      throw new Error("Not found");
    }
    return receptionist;
  } catch (error) {
    throw new Error("Error fetching: " + error.message);
  }
};
exports.getOneReceptionistByIdService = getOneReceptionistByIdService;
const updateReceptionistByIdService = async (id, updateData) => {
  try {
    const updatedReceptionist = await (0, _receptionistRepository.updateReceptionistById)(id, updateData);
    if (!updatedReceptionist) {
      throw new Error("Receptionist not found");
    }
    return updatedReceptionist;
  } catch (error) {
    throw new Error("Error updating: " + error.message);
  }
};
exports.updateReceptionistByIdService = updateReceptionistByIdService;
const deleteReceptionistByIdService = async id => {
  try {
    const deletedReceptionist = await (0, _receptionistRepository.deleteReceptionistById)(id);
    if (!deletedReceptionist) {
      throw new Error("Not found");
    }
    return deletedReceptionist;
  } catch (error) {
    throw new Error("Error deleting: " + error.message);
  }
};
exports.deleteReceptionistByIdService = deleteReceptionistByIdService;
const getMedicationFluctuationsService = async () => {
  try {
    return await (0, _prescriptionRepository.getMedicationFluctuationsRepo)();
  } catch (error) {
    throw new Error("Error fetching medication fluctuations: " + error.message);
  }
};
exports.getMedicationFluctuationsService = getMedicationFluctuationsService;
const checkRequestTestExistence = async (patientId, doctorId) => {
  const filteredTests = await (0, _requestTestRepository.filterRequestTests)(patientId, doctorId);
  return filteredTests.length > 0;
};
exports.checkRequestTestExistence = checkRequestTestExistence;