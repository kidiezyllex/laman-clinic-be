"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _pharmacistController = require("../controllers/pharmacistController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// pharmacistRouter.js

const routerPharmacist = _express.default.Router();
routerPharmacist.get("/get-list-prescriptions", _pharmacistController.listPrescriptionsController); // có đụng redis

routerPharmacist.post("/", _pharmacistController.createPharmacistController);
routerPharmacist.post("/create-prescriptionBill", _pharmacistController.createPrescriptionBillController);
routerPharmacist.get("/", _pharmacistController.getListPharmacistsController);
routerPharmacist.get("/:id", _pharmacistController.getOnePharmacistByIdController);
routerPharmacist.get("/prescriptionBill/:id", _pharmacistController.prescriptionByIdController);
routerPharmacist.patch("/:prescriptionId/complete", _pharmacistController.completePrescriptionController);
var _default = exports.default = routerPharmacist;