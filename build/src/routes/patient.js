"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _patientController = require("../controllers/patientController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerPatient = _express.default.Router();
routerPatient.post("/", _patientController.createPatientController);
routerPatient.get("/:id", _patientController.getOnePatientByIdController);
routerPatient.get("/", _patientController.getListPatientsController);
routerPatient.put("/:id", _patientController.updatePatientByIdController);
routerPatient.delete("/:id", _patientController.deletePatientByIdController);
routerPatient.get("/clerk/:clerkId", _patientController.getOnePatientByClerkIdController);
var _default = exports.default = routerPatient;