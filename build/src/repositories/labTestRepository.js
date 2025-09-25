"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLabTestById = exports.getOneLabTestById = exports.getListLabTests = exports.deleteLabTestById = exports.createLabTest = void 0;
var _LabTest = _interopRequireDefault(require("../models/LabTest.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createLabTest = async labTestData => {
  const labTest = new _LabTest.default(labTestData);
  return await labTest.save();
};
exports.createLabTest = createLabTest;
const getListLabTests = async () => {
  return await _LabTest.default.find().populate('technician');
};
exports.getListLabTests = getListLabTests;
const getOneLabTestById = async id => {
  return await _LabTest.default.findById(id).populate('technician');
};
exports.getOneLabTestById = getOneLabTestById;
const updateLabTestById = async (id, updateData) => {
  return await _LabTest.default.findByIdAndUpdate(id, updateData, {
    new: true
  });
};
exports.updateLabTestById = updateLabTestById;
const deleteLabTestById = async id => {
  return await _LabTest.default.findByIdAndDelete(id);
};
exports.deleteLabTestById = deleteLabTestById;