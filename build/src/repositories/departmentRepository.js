"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDepartmentById = exports.getOneDepartmentById = exports.getListDepartments = exports.deleteDepartmentById = exports.createDepartment = void 0;
var _Department = _interopRequireDefault(require("../models/Department.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createDepartment = async departmentData => {
  const department = new _Department.default(departmentData);
  return await department.save();
};
exports.createDepartment = createDepartment;
const getListDepartments = async () => {
  return await _Department.default.find().populate('head').populate('staff').populate('clinic');
};
exports.getListDepartments = getListDepartments;
const getOneDepartmentById = async id => {
  return await _Department.default.findById(id).populate('head').populate('staff').populate('clinic');
};
exports.getOneDepartmentById = getOneDepartmentById;
const updateDepartmentById = async (id, updateData) => {
  return await _Department.default.findByIdAndUpdate(id, updateData, {
    new: true
  });
};
exports.updateDepartmentById = updateDepartmentById;
const deleteDepartmentById = async id => {
  return await _Department.default.findByIdAndDelete(id);
};
exports.deleteDepartmentById = deleteDepartmentById;