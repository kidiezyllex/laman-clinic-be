"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClinic = exports.listClinics = exports.getClinicById = exports.deleteClinic = exports.createClinics = void 0;
var _clinicRepository = require("../repositories/clinicRepository.js");
const createClinics = async clinicData => {
  return await (0, _clinicRepository.createClinic)(clinicData);
};
exports.createClinics = createClinics;
const listClinics = async () => {
  return await (0, _clinicRepository.getListClinics)();
};
exports.listClinics = listClinics;
const getClinicById = async id => {
  const clinic = await (0, _clinicRepository.getOneClinicById)(id);
  if (!clinic) throw new Error("Clinic not found");
  return clinic;
};
exports.getClinicById = getClinicById;
const updateClinic = async (id, updateData) => {
  const clinic = await (0, _clinicRepository.updateClinicById)(id, updateData);
  if (!clinic) throw new Error("Clinic not found");
  return clinic;
};
exports.updateClinic = updateClinic;
const deleteClinic = async id => {
  const clinic = await (0, _clinicRepository.deleteClinicById)(id);
  if (!clinic) throw new Error("Clinic not found");
  return clinic;
};
exports.deleteClinic = deleteClinic;