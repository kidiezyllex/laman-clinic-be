"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDiagnosisById = exports.getOneDiagnosisById = exports.getListDiagnoses = exports.deleteDiagnosisById = exports.createDiagnosis = void 0;
var _Diagnosis = _interopRequireDefault(require("../models/Diagnosis.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createDiagnosis = async diagnosisData => {
  const diagnosis = new _Diagnosis.default(diagnosisData);
  return await diagnosis.save();
};
exports.createDiagnosis = createDiagnosis;
const getListDiagnoses = async () => {
  return await _Diagnosis.default.find();
};
exports.getListDiagnoses = getListDiagnoses;
const getOneDiagnosisById = async id => {
  return await _Diagnosis.default.findById(id);
};
exports.getOneDiagnosisById = getOneDiagnosisById;
const updateDiagnosisById = async (id, updateData) => {
  return await _Diagnosis.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateDiagnosisById = updateDiagnosisById;
const deleteDiagnosisById = async id => {
  return await _Diagnosis.default.findByIdAndDelete(id);
};
exports.deleteDiagnosisById = deleteDiagnosisById;