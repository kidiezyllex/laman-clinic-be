"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = require("../controllers/adminController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _adminController.createAdminController);
router.get("/report/month/:year", _adminController.getCompletedAppointmentsByMonthController);
router.get("/report", _adminController.getSpecializationStats);
router.get("/", _adminController.getListAdminsController);
router.get("/:id", _adminController.getOneAdminByIdController);
router.put("/:id", _adminController.updateAdminByIdController);
router.delete("/:id", _adminController.deleteAdminByIdController);
var _default = exports.default = router;