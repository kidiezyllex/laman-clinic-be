"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _appointmentController = require("../controllers/appointmentController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerAppointment = _express.default.Router();

//lấy dữ liệu test màn hình bác sĩ http://localhost:3000/api/appointments/

// Tạo cuộc hẹn mới
routerAppointment.post("/", _appointmentController.createAppointmentController);

// Lấy danh sách cuộc hẹn
routerAppointment.get("/", _appointmentController.listAppointmentsController); // Admin, doctors

// Lấy chi tiết một cuộc hẹn
routerAppointment.get("/:id", _appointmentController.getAppointmentByIdController);

// Cập nhật thông tin cuộc hẹn
routerAppointment.patch("/:id", _appointmentController.updateAppointmentController);

// Xóa cuộc hẹn
routerAppointment.delete("/:id", _appointmentController.deleteAppointmentController);
var _default = exports.default = routerAppointment;