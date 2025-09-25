"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePrescriptionByIdService = exports.getOnePrescriptionByIdService = exports.getOnePrescriptionByAppointmentIdService = exports.getListPrescriptionsService = exports.getListAdminsService = exports.getAppointmentIdsByDoctorIdService = exports.deletePrescriptionByIdService = exports.createPrescriptionService = exports.completePrescriptionService = exports.checkPrescriptionByAppointmentIdService = void 0;
var _prescriptionRepository = require("../repositories/prescriptionRepository.js");
const createPrescriptionService = async prescriptionData => {
  try {
    return await (0, _prescriptionRepository.createPrescriptionRepo)(prescriptionData);
  } catch (error) {
    throw new Error("Error creating prescription: " + error.message);
  }
};
exports.createPrescriptionService = createPrescriptionService;
const getListPrescriptionsService = async () => {
  try {
    return await (0, _prescriptionRepository.getListPrescriptionsRepo)();
  } catch (error) {
    throw new Error("Error fetching prescription list: " + error.message);
  }
};
exports.getListPrescriptionsService = getListPrescriptionsService;
const getOnePrescriptionByIdService = async id => {
  try {
    const prescription = await (0, _prescriptionRepository.getOnePrescriptionByIdRepo)(id);
    if (!prescription) {
      throw new Error("Prescription not found");
    }
    return prescription;
  } catch (error) {
    throw new Error("Error fetching prescription: " + error.message);
  }
};
exports.getOnePrescriptionByIdService = getOnePrescriptionByIdService;
const getOnePrescriptionByAppointmentIdService = async appointmentId => {
  let query = {};
  if (appointmentId) {
    query.appointmentId = appointmentId;
  }
  return await (0, _prescriptionRepository.findPrescriptionByAppointmentId)(query);
};
exports.getOnePrescriptionByAppointmentIdService = getOnePrescriptionByAppointmentIdService;
const getListAdminsService = async () => {
  try {
    return await getListAdmins();
  } catch (error) {
    throw new Error("Error fetching admin list: " + error.message);
  }
};
exports.getListAdminsService = getListAdminsService;
const updatePrescriptionByIdService = async (id, updateData) => {
  try {
    const updatedPrescription = await (0, _prescriptionRepository.updatePrescriptionByIdRepo)(id, updateData);
    if (!updatedPrescription) {
      throw new Error("Prescription not found");
    }
    return updatedPrescription;
  } catch (error) {
    throw new Error("Error updating prescription: " + error.message);
  }
};
exports.updatePrescriptionByIdService = updatePrescriptionByIdService;
const deletePrescriptionByIdService = async id => {
  try {
    const deletedPrescription = await (0, _prescriptionRepository.deletePrescriptionByIdRepo)(id);
    if (!deletedPrescription) {
      throw new Error("Prescription not found");
    }
    return deletedPrescription;
  } catch (error) {
    throw new Error("Error deleting prescription: " + error.message);
  }
};
exports.deletePrescriptionByIdService = deletePrescriptionByIdService;
const completePrescriptionService = async (prescriptionId, warehouseId) => {
  try {
    const completedPrescription = await (0, _prescriptionRepository.completePrescriptionRepository)(prescriptionId, warehouseId);
    return completedPrescription;
  } catch (error) {
    throw new Error("Error completing prescription: " + error.message);
  }
};
exports.completePrescriptionService = completePrescriptionService;
const checkPrescriptionByAppointmentIdService = async appointmentId => {
  const exists = await (0, _prescriptionRepository.checkPrescriptionByAppointmentIdRepo)(appointmentId);
  return !!exists;
};
exports.checkPrescriptionByAppointmentIdService = checkPrescriptionByAppointmentIdService;
const getAppointmentIdsByDoctorIdService = async doctorId => {
  return await (0, _prescriptionRepository.getAppointmentIdsByDoctorIdRepo)(doctorId);
};
exports.getAppointmentIdsByDoctorIdService = getAppointmentIdsByDoctorIdService;