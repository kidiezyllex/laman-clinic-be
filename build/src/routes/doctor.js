"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _doctorController = require("../controllers/doctorController.js");
var _redisClient = require("../redis/redisClient.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerDoctor = _express.default.Router();

// Tạo đơn thuốc
routerDoctor.post("/create-prescription", _doctorController.createPrescriptionController);

// Tạo danh sách dịch vụ
routerDoctor.post("/create-service-list", _doctorController.createServiceListController);

// Tạo request xét nghiệm
routerDoctor.post("/create-request-test", _doctorController.createRequestTestController);
routerDoctor.post("/complete", _doctorController.completeAppointmentController); // hoàn thành ca khám

routerDoctor.get("/specializations", _doctorController.getSpecializationsController); // không có kafka
// Tạo lịch tái khám cho bệnh nhân
routerDoctor.post("/reExamination", _doctorController.createReExaminationController);

// Lấy danh sách các ca khám mà bác sĩ đã hoàn thành trong ngày cụ thể
// vd: GET http://.../api/doctors/BS-ABCDEF/appointments/2024-11-09
routerDoctor.get("/get-appointments/:roomNumber", async (req, res) => {
  const {
    roomNumber
  } = req.params;
  const queueKey = `queue:${roomNumber}`;
  try {
    const patientsData = await _redisClient.redisClient.lRange(queueKey, 0, -1);
    if (!patientsData.length) {
      return res.status(404).json({
        success: false,
        message: "No patients in queue"
      });
    }

    // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
    const parsedPatientsData = patientsData.map(data => {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error(`Invalid JSON data: ${data}`);
        return null; // Trả về null nếu dữ liệu không hợp lệ
      }
    }).filter(data => data !== null); // Lọc bỏ những phần tử không hợp lệ

    res.status(200).json(parsedPatientsData);
  } catch (err) {
    console.error("Error retrieving patients from queue:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}); // đổi queue/000 thành routes này
routerDoctor.get("/:id", _doctorController.getOneDoctorController);
routerDoctor.get("/:doctorId/appointments/:date", _doctorController.getAppointmentsByDateController);

// Cập nhật trạng thái Online và số phòng của 1 Bác sĩ
routerDoctor.patch("/:doctorId/updateRoomNumber", _doctorController.updateDoctorOnlineStatusController);
// lấy danh sách bác sĩ thuộc khoa X hoặc theo email nếu không truyền tham số thì sẽ lấy toàn bộ danh sách
routerDoctor.get("/", _doctorController.getListDoctorsController);

// Tạo 1 bác sĩ
routerDoctor.post("/", _doctorController.createDoctorController);
var _default = exports.default = routerDoctor;