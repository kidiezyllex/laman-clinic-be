"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _labTestController = require("../controllers/labTestController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerLabTest = _express.default.Router();

// Tạo lab test mới
routerLabTest.post("/", _labTestController.createLabTestController);

// Lấy danh sách lab tests
routerLabTest.get("/", _labTestController.listLabTestsController);

// Lấy chi tiết một lab test
routerLabTest.get("/:id", _labTestController.getLabTestByIdController);

// Cập nhật thông tin lab test
routerLabTest.patch("/:id", _labTestController.updateLabTestController);

// Xóa lab test
routerLabTest.delete("/:id", _labTestController.deleteLabTestController);
var _default = exports.default = routerLabTest;