"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInvoiceController = exports.getListInvoicesController = exports.getInvoiceByIdController = exports.deleteInvoiceController = exports.createInvoiceController = void 0;
var _invoiceServices = require("../services/invoiceServices.js");
const createInvoiceController = async (req, res) => {
  try {
    const invoice = await (0, _invoiceServices.createInvoiceService)(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
exports.createInvoiceController = createInvoiceController;
const getListInvoicesController = async (req, res) => {
  try {
    const invoices = await (0, _invoiceServices.getListInvoicesService)();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getListInvoicesController = getListInvoicesController;
const getInvoiceByIdController = async (req, res) => {
  try {
    const invoice = await (0, _invoiceServices.getInvoiceByIdService)(req.params.id);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.getInvoiceByIdController = getInvoiceByIdController;
const updateInvoiceController = async (req, res) => {
  try {
    const invoice = await (0, _invoiceServices.updateInvoiceService)(req.params.id, req.body);
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
exports.updateInvoiceController = updateInvoiceController;
const deleteInvoiceController = async (req, res) => {
  try {
    await (0, _invoiceServices.deleteInvoiceService)(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.deleteInvoiceController = deleteInvoiceController;