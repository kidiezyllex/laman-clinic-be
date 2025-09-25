"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePatientById = exports.getOnePatientById = exports.getListPatients = exports.findPatient = exports.deletePatientById = exports.createPatient = void 0;
var _Patient = _interopRequireDefault(require("../models/Patient.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createPatient = async patientData => {
  const patient = new _Patient.default(patientData);
  return await patient.save();
};
exports.createPatient = createPatient;
const getListPatients = async () => {
  return await _Patient.default.find();
};
exports.getListPatients = getListPatients;
const getOnePatientById = async id => {
  return await _Patient.default.findById(id);
};
exports.getOnePatientById = getOnePatientById;
const findPatient = async query => {
  return await _Patient.default.findOne(query);
};
exports.findPatient = findPatient;
const updatePatientById = async (id, updateData) => {
  return await _Patient.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updatePatientById = updatePatientById;
const deletePatientById = async id => {
  return await _Patient.default.findByIdAndDelete(id);
};
exports.deletePatientById = deletePatientById;