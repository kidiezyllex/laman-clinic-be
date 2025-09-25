"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _laboratoryTechnicianController = require("../controllers/laboratoryTechnicianController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerLaboratoryTechnician = _express.default.Router();
routerLaboratoryTechnician.post("/", _laboratoryTechnicianController.createLaboratoryTechnicianController); // Admin

routerLaboratoryTechnician.get("/", _laboratoryTechnicianController.getListLaboratoryTechniciansController); // ADmin

routerLaboratoryTechnician.get("/:id", _laboratoryTechnicianController.getLaboratoryTechnicianByIdController);
routerLaboratoryTechnician.patch("/:id", _laboratoryTechnicianController.updateLaboratoryTechnicianController);
routerLaboratoryTechnician.delete("/:id", _laboratoryTechnicianController.deleteLaboratoryTechnicianController);
var _default = exports.default = routerLaboratoryTechnician;