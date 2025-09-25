"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInvoiceById = exports.getOneInvoiceById = exports.getListInvoices = exports.findInvoice = exports.deleteInvoiceById = exports.createInvoice = void 0;
var _Invoice = _interopRequireDefault(require("../models/Invoice.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createInvoice = async invoiceData => {
  const invoice = new _Invoice.default(invoiceData);
  return await invoice.save();
};
exports.createInvoice = createInvoice;
const getListInvoices = async () => {
  return await _Invoice.default.find();
};
exports.getListInvoices = getListInvoices;
const findInvoice = async query => {
  return await _Invoice.default.findOne(query);
};
exports.findInvoice = findInvoice;
const getOneInvoiceById = async id => {
  return await _Invoice.default.findById(id);
};
exports.getOneInvoiceById = getOneInvoiceById;
const updateInvoiceById = async (id, updateData) => {
  return await _Invoice.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateInvoiceById = updateInvoiceById;
const deleteInvoiceById = async id => {
  return await _Invoice.default.findByIdAndDelete(id);
};
exports.deleteInvoiceById = deleteInvoiceById;