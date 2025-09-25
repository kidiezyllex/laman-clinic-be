"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClinicById = exports.getOneClinicById = exports.getListClinics = exports.deleteClinicById = exports.createClinic = void 0;
var _Clinic = _interopRequireDefault(require("../models/Clinic.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createClinic = async clinicData => {
  const clinic = new _Clinic.default(clinicData);
  return await clinic.save();
};
exports.createClinic = createClinic;
const getListClinics = async () => {
  return await _Clinic.default.find().populate('departments').populate('doctors').populate('pharmacists').populate('laboratoryTechnicians').populate('receptionists');
};
exports.getListClinics = getListClinics;
const getOneClinicById = async id => {
  return await _Clinic.default.findById(id).populate('departments').populate('doctors').populate('pharmacists').populate('laboratoryTechnicians').populate('receptionists');
};
exports.getOneClinicById = getOneClinicById;
const updateClinicById = async (id, updateData) => {
  return await _Clinic.default.findByIdAndUpdate(id, updateData, {
    new: true
  });
};
exports.updateClinicById = updateClinicById;
const deleteClinicById = async id => {
  return await _Clinic.default.findByIdAndDelete(id);
};
exports.deleteClinicById = deleteClinicById;