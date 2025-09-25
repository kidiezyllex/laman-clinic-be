"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMedicationByIdService = exports.getOneMedicationByIdService = exports.getMedicationByName = exports.getListMedicationsService = exports.deleteMedicationByIdService = exports.createMedicationService = void 0;
var _medicationRepository = require("../repositories/medicationRepository.js");
const createMedicationService = async medicationData => {
  try {
    return await (0, _medicationRepository.createMedication)(medicationData);
  } catch (error) {
    throw new Error("Error creating medication: " + error.message);
  }
};
exports.createMedicationService = createMedicationService;
const getMedicationByName = async medicationName => {
  let query = {};
  if (medicationName) {
    query.medicationName = medicationName;
  }
  return await (0, _medicationRepository.findMedication)(query);
};
exports.getMedicationByName = getMedicationByName;
const getListMedicationsService = async () => {
  try {
    return await (0, _medicationRepository.getListMedications)();
  } catch (error) {
    throw new Error("Error fetching Medication list: " + error.message);
  }
};
exports.getListMedicationsService = getListMedicationsService;
const getOneMedicationByIdService = async id => {
  try {
    const medication = await (0, _medicationRepository.getOneMedicationById)(id);
    if (!medication) {
      throw new Error("Medication not found");
    }
    return medication;
  } catch (error) {
    throw new Error("Error fetching Medication: " + error.message);
  }
};
exports.getOneMedicationByIdService = getOneMedicationByIdService;
const updateMedicationByIdService = async (id, updateData) => {
  try {
    const updatedMedication = await (0, _medicationRepository.updateMedicationById)(id, updateData);
    if (!updatedMedication) {
      throw new Error("Medication not found");
    }
    return updatedMedication;
  } catch (error) {
    throw new Error("Error updating Medication: " + error.message);
  }
};
exports.updateMedicationByIdService = updateMedicationByIdService;
const deleteMedicationByIdService = async id => {
  try {
    const deletedMedication = await (0, _medicationRepository.deleteMedicationById)(id);
    if (!deletedMedication) {
      throw new Error("Medication not found");
    }
    return deletedMedication;
  } catch (error) {
    throw new Error("Error deleting Medication: " + error.message);
  }
};
exports.deleteMedicationByIdService = deleteMedicationByIdService;