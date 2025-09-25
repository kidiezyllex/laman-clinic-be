"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _prescriptionController = require("../controllers/prescriptionController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _prescriptionController.createPrescriptionController);
router.get("/", _prescriptionController.getListPrescriptionsController);
router.get("/check", _prescriptionController.getAppointmentIdsByDoctorController);
router.get("/medication-fluctuations", _prescriptionController.getMedicationFluctuationsController);
router.get("/:id", _prescriptionController.getOnePrescriptionByIdController);
router.put("/:id", _prescriptionController.updatePrescriptionByIdController);
router.delete("/:id", _prescriptionController.deletePrescriptionByIdController);
router.post("/complete", _prescriptionController.completePrescriptionController);
var _default = exports.default = router;