"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _medicationController = require("../controllers/medicationController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerMedication = _express.default.Router();
routerMedication.post("/", _medicationController.createMedicationController);
routerMedication.get("/", _medicationController.getListMedicationsController);
routerMedication.get("/:id", _medicationController.getOneMedicationByIdController);
routerMedication.put("/:id", _medicationController.updateMedicationByIdController);
routerMedication.delete("/:id", _medicationController.deleteMedicationByIdController);
var _default = exports.default = routerMedication;