"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _clinicController = require("../controllers/clinicController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerClinic = _express.default.Router();
//Admin, lễ tân

//doctors chỉ cần set lại roomNumber không cần care tới cái này.
// Tạo clinic mới
routerClinic.post("/", _clinicController.createClinicController);

// Lấy danh sách clinics
routerClinic.get("/", _clinicController.listClinicsController); //Lễ tân

// Lấy chi tiết một clinic
routerClinic.get("/:id", _clinicController.getClinicByIdController);

// Cập nhật thông tin clinic
routerClinic.patch("/:id", _clinicController.updateClinicController);

// Xóa clinic
routerClinic.delete("/:id", _clinicController.deleteClinicController);
var _default = exports.default = routerClinic;