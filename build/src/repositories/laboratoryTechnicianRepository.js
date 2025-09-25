"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLaboratoryTechnicianById = exports.getOneLaboratoryTechnicianById = exports.getListLaboratoryTechnicians = exports.findLaboratoryTechnician = exports.deleteLaboratoryTechnicianById = exports.createLaboratoryTechnician = void 0;
var _LaboratoryTechnician = _interopRequireDefault(require("../models/LaboratoryTechnician.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createLaboratoryTechnician = async technicianData => {
  const technician = new _LaboratoryTechnician.default(technicianData);
  return await technician.save();
};
exports.createLaboratoryTechnician = createLaboratoryTechnician;
const getListLaboratoryTechnicians = async () => {
  return await _LaboratoryTechnician.default.find();
};
exports.getListLaboratoryTechnicians = getListLaboratoryTechnicians;
const findLaboratoryTechnician = async query => {
  return await _LaboratoryTechnician.default.findOne(query);
};
exports.findLaboratoryTechnician = findLaboratoryTechnician;
const getOneLaboratoryTechnicianById = async id => {
  return await _LaboratoryTechnician.default.findById(id);
};
exports.getOneLaboratoryTechnicianById = getOneLaboratoryTechnicianById;
const updateLaboratoryTechnicianById = async (id, updateData) => {
  return await _LaboratoryTechnician.default.findByIdAndUpdate(id, updateData, {
    new: true
  });
};
exports.updateLaboratoryTechnicianById = updateLaboratoryTechnicianById;
const deleteLaboratoryTechnicianById = async id => {
  return await _LaboratoryTechnician.default.findByIdAndDelete(id);
};
exports.deleteLaboratoryTechnicianById = deleteLaboratoryTechnicianById;