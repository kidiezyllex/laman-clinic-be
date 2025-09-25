"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInvoiceService = exports.getListInvoicesService = exports.getInvoiceByIdService = exports.deleteInvoiceService = exports.createInvoiceService = void 0;
var _invoiceRepository = require("../repositories/invoiceRepository.js");
const createInvoiceService = async technicianData => {
  return await (0, _invoiceRepository.createInvoice)(technicianData);
};
exports.createInvoiceService = createInvoiceService;
const getListInvoicesService = async () => {
  return await (0, _invoiceRepository.getListInvoices)();
};
exports.getListInvoicesService = getListInvoicesService;
const getInvoiceByIdService = async id => {
  const technician = await (0, _invoiceRepository.getOneInvoiceById)(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.getInvoiceByIdService = getInvoiceByIdService;
const updateInvoiceService = async (id, updateData) => {
  const technician = await (0, _invoiceRepository.updateInvoiceById)(id, updateData);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.updateInvoiceService = updateInvoiceService;
const deleteInvoiceService = async id => {
  const technician = await (0, _invoiceRepository.deleteInvoiceById)(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.deleteInvoiceService = deleteInvoiceService;