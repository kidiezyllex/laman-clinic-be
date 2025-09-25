"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _departmentController = require("../controllers/departmentController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerDepartment = _express.default.Router();
//Admin

// Tạo department mới
routerDepartment.post("/", _departmentController.createDepartmentController);

// Lấy danh sách departments
routerDepartment.get("/", _departmentController.listDepartmentsController);

// Lấy chi tiết một department
routerDepartment.get("/:id", _departmentController.getDepartmentByIdController);

// Cập nhật thông tin department
routerDepartment.patch("/:id", _departmentController.updateDepartmentController);

// Xóa department
routerDepartment.delete("/:id", _departmentController.deleteDepartmentController);
var _default = exports.default = routerDepartment;