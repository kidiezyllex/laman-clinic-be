"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _AppointmentByPatient = _interopRequireDefault(require("../models/AppointmentByPatient.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Tạo cuộc hẹn mới
router.post("/", async (req, res) => {
  try {
    const appointmentByPatient = new _AppointmentByPatient.default(req.body);
    await appointmentByPatient.save();
    res.status(201).send(appointmentByPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Tạo cuộc hẹn mới
router.post("/", async (req, res) => {
  try {
    const appointmentByPatient = new _AppointmentByPatient.default(req.body);
    await appointmentByPatient.save();
    res.status(201).send(appointmentByPatient);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách cuộc hẹn
router.get("/", async (req, res) => {
  try {
    let appointmentByPatientList;
    const {
      id
    } = req.query;
    if (!id) {
      appointmentByPatientList = await _AppointmentByPatient.default.find();
    } else appointmentByPatientList = await _AppointmentByPatient.default.findOne({
      id
    });
    res.status(200).send(appointmentByPatientList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Xóa cuộc hẹn
router.delete("/", async (req, res) => {
  try {
    const {
      _id
    } = req.query;
    const result = await _AppointmentByPatient.default.findOneAndDelete({
      _id
    });
    if (!result) {
      return res.status(404).send({
        message: "Appointment not found"
      });
    }
    res.status(200).send({
      message: "Appointment deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).send({
      message: "Error deleting appointment",
      error: error.message
    });
  }
});
var _default = exports.default = router;