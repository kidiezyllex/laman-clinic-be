"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDepartmentController = exports.listDepartmentsController = exports.getDepartmentByIdController = exports.deleteDepartmentController = exports.createDepartmentController = void 0;
var _departmentServices = require("../services/departmentServices.js");
// Tạo một department mới
const createDepartmentController = async (req, res) => {
  try {
    const department = await (0, _departmentServices.createDepartments)(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

// Lấy danh sách departments
exports.createDepartmentController = createDepartmentController;
const listDepartmentsController = async (req, res) => {
  try {
    const departments = await (0, _departmentServices.listDepartments)();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Lấy chi tiết một department
exports.listDepartmentsController = listDepartmentsController;
const getDepartmentByIdController = async (req, res) => {
  try {
    const department = await (0, _departmentServices.getDepartmentById)(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

// Cập nhật thông tin department
exports.getDepartmentByIdController = getDepartmentByIdController;
const updateDepartmentController = async (req, res) => {
  try {
    const department = await (0, _departmentServices.updateDepartment)(req.params.id, req.body);
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Xóa department
exports.updateDepartmentController = updateDepartmentController;
const deleteDepartmentController = async (req, res) => {
  try {
    await (0, _departmentServices.deleteDepartment)(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.deleteDepartmentController = deleteDepartmentController;