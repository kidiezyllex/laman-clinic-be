"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _invoiceController = require("../controllers/invoiceController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerInvoice = _express.default.Router();
routerInvoice.post("/", _invoiceController.createInvoiceController);
routerInvoice.get("/", _invoiceController.getListInvoicesController);
routerInvoice.get("/:id", _invoiceController.getInvoiceByIdController);
routerInvoice.patch("/:id", _invoiceController.updateInvoiceController);
routerInvoice.delete("/:id", _invoiceController.deleteInvoiceController);
var _default = exports.default = routerInvoice;