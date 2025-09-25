"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDiagnosisByIdService = exports.getOneDiagnosisByIdService = exports.getListDiagnosesService = exports.deleteDiagnosisByIdService = exports.createDiagnosisService = void 0;
var _diagnosisRepository = require("../repositories/diagnosisRepository.js");
const createDiagnosisService = async diagnosisData => {
  try {
    return await (0, _diagnosisRepository.createDiagnosis)(diagnosisData);
  } catch (error) {
    throw new Error("Error creating diagnosis: " + error.message);
  }
};
exports.createDiagnosisService = createDiagnosisService;
const getListDiagnosesService = async () => {
  try {
    return await (0, _diagnosisRepository.getListDiagnoses)();
  } catch (error) {
    throw new Error("Error fetching diagnosis list: " + error.message);
  }
};
exports.getListDiagnosesService = getListDiagnosesService;
const getOneDiagnosisByIdService = async id => {
  try {
    const diagnosis = await (0, _diagnosisRepository.getOneDiagnosisById)(id);
    if (!diagnosis) {
      throw new Error("Diagnosis not found");
    }
    return diagnosis;
  } catch (error) {
    throw new Error("Error fetching diagnosis: " + error.message);
  }
};
exports.getOneDiagnosisByIdService = getOneDiagnosisByIdService;
const updateDiagnosisByIdService = async (id, updateData) => {
  try {
    const updatedDiagnosis = await (0, _diagnosisRepository.updateDiagnosisById)(id, updateData);
    if (!updatedDiagnosis) {
      throw new Error("Diagnosis not found");
    }
    return updatedDiagnosis;
  } catch (error) {
    throw new Error("Error updating diagnosis: " + error.message);
  }
};
exports.updateDiagnosisByIdService = updateDiagnosisByIdService;
const deleteDiagnosisByIdService = async id => {
  try {
    const deletedDiagnosis = await (0, _diagnosisRepository.deleteDiagnosisById)(id);
    if (!deletedDiagnosis) {
      throw new Error("Diagnosis not found");
    }
    return deletedDiagnosis;
  } catch (error) {
    throw new Error("Error deleting diagnosis: " + error.message);
  }
};
exports.deleteDiagnosisByIdService = deleteDiagnosisByIdService;