"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMedicationById = exports.getOneMedicationById = exports.getListMedications = exports.findMedication = exports.deleteMedicationById = exports.createMedication = void 0;
var _Medication = _interopRequireDefault(require("../models/Medication.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createMedication = async medicationData => {
  const medication = new _Medication.default(medicationData);
  return await medication.save();
};
exports.createMedication = createMedication;
const getListMedications = async () => {
  return await _Medication.default.find();
};
exports.getListMedications = getListMedications;
const findMedication = async query => {
  return await _Medication.default.findOne(query);
};
exports.findMedication = findMedication;
const getOneMedicationById = async id => {
  return await _Medication.default.findById(id);
};
exports.getOneMedicationById = getOneMedicationById;
const updateMedicationById = async (id, updateData) => {
  return await _Medication.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateMedicationById = updateMedicationById;
const deleteMedicationById = async id => {
  return await _Medication.default.findByIdAndDelete(id);
};
exports.deleteMedicationById = deleteMedicationById;