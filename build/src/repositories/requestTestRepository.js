"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRequestTestById = exports.getOneRequestTestById = exports.getListRequestTests = exports.getAppointmentIdsByDoctorId = exports.filterRequestTests = exports.deleteRequestTestById = exports.createRequestTest = void 0;
var _RequestTest = _interopRequireDefault(require("../models/RequestTest.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createRequestTest = async requestTestData => {
  const requestTest = new _RequestTest.default(requestTestData);
  return await requestTest.save();
};
exports.createRequestTest = createRequestTest;
const getListRequestTests = async () => {
  return await _RequestTest.default.find().populate("patientId").populate("doctorId");
};
exports.getListRequestTests = getListRequestTests;
const getOneRequestTestById = async id => {
  return await _RequestTest.default.findById(id).populate("patientId").populate("doctorId");
};
exports.getOneRequestTestById = getOneRequestTestById;
const updateRequestTestById = async (id, updateData) => {
  return await _RequestTest.default.findByIdAndUpdate(id, updateData, {
    new: true
  });
};
exports.updateRequestTestById = updateRequestTestById;
const deleteRequestTestById = async id => {
  return await _RequestTest.default.findByIdAndDelete(id);
};
exports.deleteRequestTestById = deleteRequestTestById;
const filterRequestTests = async (patientId, doctorId) => {
  const filter = {};
  if (patientId) filter.patientId = patientId;
  if (doctorId) filter.doctorId = doctorId;
  return await _RequestTest.default.find(filter);
};
exports.filterRequestTests = filterRequestTests;
const getAppointmentIdsByDoctorId = async doctorId => {
  const requests = await _RequestTest.default.find({
    doctorId
  }).distinct("appointmentId");
  return requests;
};
exports.getAppointmentIdsByDoctorId = getAppointmentIdsByDoctorId;