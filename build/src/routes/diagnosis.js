"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _diagnosisController = require("../controllers/diagnosisController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerDiagnosis = _express.default.Router();

// Tạo một diagnosis mới
routerDiagnosis.post("/", _diagnosisController.createDiagnosisController);

// Lấy danh sách tất cả diagnoses (có thể cần role-based access control)
routerDiagnosis.get("/", _diagnosisController.getListDiagnosesController);

// Lấy chi tiết một diagnosis
routerDiagnosis.get("/:id", _diagnosisController.getOneDiagnosisByIdController);

// Cập nhật thông tin diagnosis
routerDiagnosis.put("/:id", _diagnosisController.updateDiagnosisByIdController); // Consider using PATCH for partial updates

// Xóa diagnosis
routerDiagnosis.delete("/:id", _diagnosisController.deleteDiagnosisByIdController);
var _default = exports.default = routerDiagnosis;