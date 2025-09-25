"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestByIdRepo = exports.getPatientIdsByDoctorIdRepo = exports.getOneTestByIdRepo = exports.getMostRecentTestRepo = exports.getListTestsRepo = exports.findTestByAppointmentId = exports.deleteTestByIdRepo = exports.createTestRepo = void 0;
var _Test = _interopRequireDefault(require("../models/Test.js"));
var _MedicineWarehouse = _interopRequireDefault(require("../models/MedicineWarehouse.js"));
var _Medication = _interopRequireDefault(require("../models/Medication.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createTestRepo = async testData => {
  const test = new _Test.default(testData);
  return await test.save();
};
exports.createTestRepo = createTestRepo;
const getListTestsRepo = async () => {
  return await _Test.default.find();
};
exports.getListTestsRepo = getListTestsRepo;
const getOneTestByIdRepo = async id => {
  return await _Test.default.findById(id);
};
exports.getOneTestByIdRepo = getOneTestByIdRepo;
const updateTestByIdRepo = async (id, updateData) => {
  return await _Test.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateTestByIdRepo = updateTestByIdRepo;
const deleteTestByIdRepo = async id => {
  return await _Test.default.findByIdAndDelete(id);
};
exports.deleteTestByIdRepo = deleteTestByIdRepo;
const getPatientIdsByDoctorIdRepo = async doctorId => {
  const tests = await _Test.default.find({
    doctorId
  }).distinct("appointmentId");
  return tests;
};
exports.getPatientIdsByDoctorIdRepo = getPatientIdsByDoctorIdRepo;
const getMostRecentTestRepo = async (patientId, doctorId) => {
  return await _Test.default.findOne({
    patientId,
    doctorId
  }).sort({
    datePerformed: -1
  }).lean();
};
exports.getMostRecentTestRepo = getMostRecentTestRepo;
const findTestByAppointmentId = async query => {
  return await _Test.default.findOne(query);
};
exports.findTestByAppointmentId = findTestByAppointmentId;