"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTestTypeById = exports.getOneTestTypeById = exports.getListTestTypes = exports.findTestType = exports.deleteTestTypeById = exports.createTestType = void 0;
var _TestType = _interopRequireDefault(require("../models/TestType.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createTestType = async testTypeData => {
  const testType = new _TestType.default(testTypeData);
  return await testType.save();
};
exports.createTestType = createTestType;
const getListTestTypes = async () => {
  return await _TestType.default.find();
};
exports.getListTestTypes = getListTestTypes;
const findTestType = async query => {
  return await _TestType.default.findOne(query);
};
exports.findTestType = findTestType;
const getOneTestTypeById = async id => {
  return await _TestType.default.findById(id);
};
exports.getOneTestTypeById = getOneTestTypeById;
const updateTestTypeById = async (id, updateData) => {
  return await _TestType.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateTestTypeById = updateTestTypeById;
const deleteTestTypeById = async id => {
  return await _TestType.default.findByIdAndDelete(id);
};
exports.deleteTestTypeById = deleteTestTypeById;