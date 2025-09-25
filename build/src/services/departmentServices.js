"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDepartment = exports.listDepartments = exports.getDepartmentById = exports.deleteDepartment = exports.createDepartments = void 0;
var _departmentRepository = require("../repositories/departmentRepository.js");
const createDepartments = async departmentData => {
  return await (0, _departmentRepository.createDepartment)(departmentData);
};
exports.createDepartments = createDepartments;
const listDepartments = async () => {
  return await (0, _departmentRepository.getListDepartments)();
};
exports.listDepartments = listDepartments;
const getDepartmentById = async id => {
  const department = await (0, _departmentRepository.getOneDepartmentById)(id);
  if (!department) throw new Error("Department not found");
  return department;
};
exports.getDepartmentById = getDepartmentById;
const updateDepartment = async (id, updateData) => {
  const department = await (0, _departmentRepository.updateDepartmentById)(id, updateData);
  if (!department) throw new Error("Department not found");
  return department;
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async id => {
  const department = await (0, _departmentRepository.deleteDepartmentById)(id);
  if (!department) throw new Error("Department not found");
  return department;
};
exports.deleteDepartment = deleteDepartment;