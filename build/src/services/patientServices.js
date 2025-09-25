"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePatientByIdService = exports.getPatientByEmail = exports.getPatientByClerkId = exports.getOnePatientByIdService = exports.getListPatientsService = exports.deletePatientByIdService = exports.createPatientService = void 0;
var _patientRepository = require("../repositories/patientRepository.js");
const createPatientService = async patientData => {
  try {
    return await (0, _patientRepository.createPatient)(patientData);
  } catch (error) {
    throw new Error("Error creating patient: " + error.message);
  }
};
exports.createPatientService = createPatientService;
const getListPatientsService = async () => {
  try {
    return await (0, _patientRepository.getListPatients)();
  } catch (error) {
    throw new Error("Error fetching patient list: " + error.message);
  }
};
exports.getListPatientsService = getListPatientsService;
const getOnePatientByIdService = async id => {
  try {
    const patient = await (0, _patientRepository.getOnePatientById)(id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return patient;
  } catch (error) {
    throw new Error("Error fetching patient: " + error.message);
  }
};
exports.getOnePatientByIdService = getOnePatientByIdService;
const updatePatientByIdService = async (id, updateData) => {
  try {
    const updatedPatient = await (0, _patientRepository.updatePatientById)(id, updateData);
    if (!updatedPatient) {
      throw new Error("Patient not found");
    }
    return updatedPatient;
  } catch (error) {
    throw new Error("Error updating patient: " + error.message);
  }
};
exports.updatePatientByIdService = updatePatientByIdService;
const deletePatientByIdService = async id => {
  try {
    const deletedPatient = await (0, _patientRepository.deletePatientById)(id);
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }
    return deletedPatient;
  } catch (error) {
    throw new Error("Error deleting patient: " + error.message);
  }
};
exports.deletePatientByIdService = deletePatientByIdService;
const getPatientByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _patientRepository.findPatient)(query);
};
exports.getPatientByEmail = getPatientByEmail;
const getPatientByClerkId = async clerkId => {
  let query = {};
  if (clerkId) {
    query.clerkId = clerkId;
  }
  return await (0, _patientRepository.findPatient)(query);
};
exports.getPatientByClerkId = getPatientByClerkId;