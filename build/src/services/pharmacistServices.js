"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrescriptionsFromQueue = exports.getPrescriptionBillById = exports.getPharmacistByEmail = exports.getOnePharmacistByIdService = exports.getListPharmacistsService = exports.fetchPharmacist = exports.createPrescriptionBill = exports.createPharmacistService = exports.completePrescriptionService = void 0;
var _PrescriptionBill = _interopRequireDefault(require("../models/PrescriptionBill.js"));
var _pharmacistRepository = require("../repositories/pharmacistRepository.js");
var _prescriptionRepository = require("../repositories/prescriptionRepository.js");
var _queueRepository = require("../repositories/queueRepository.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// pharmacistService.js

const getPharmacistByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _pharmacistRepository.findPharmacist)(query);
};
// Get all prescriptions from Redis queue
exports.getPharmacistByEmail = getPharmacistByEmail;
const getPrescriptionsFromQueue = async () => {
  const queueKey = `queue:Pharmacist`;
  const prescriptionsData = await (0, _queueRepository.getAppointmentsFromQueueRepo)(queueKey);
  const parsedData = prescriptionsData.map(data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(`Invalid JSON data: ${data}`);
      return null;
    }
  }).filter(data => data !== null);
  return parsedData;
};

// Create a new prescription bill
exports.getPrescriptionsFromQueue = getPrescriptionsFromQueue;
const createPrescriptionBill = async billData => {
  const {
    patientId,
    doctorId,
    pharmacistId,
    services
  } = billData;
  const totalAmount = services.reduce((total, service) => total + service.cost, 0);
  const newPrescriptionBill = new _PrescriptionBill.default({
    patientId,
    doctorId,
    pharmacistId,
    services,
    totalAmount
  });
  return await newPrescriptionBill.save();
};

// Get a specific prescription bill by ID
exports.createPrescriptionBill = createPrescriptionBill;
const getPrescriptionBillById = async id => {
  const bill = await _PrescriptionBill.default.findById(id);
  if (!bill) throw new Error("Prescription bill not found");
  return bill;
};
exports.getPrescriptionBillById = getPrescriptionBillById;
const completePrescriptionService = async (prescriptionId, warehouseId) => {
  try {
    const prescriptionsData = await (0, _queueRepository.getAppointmentsFromQueueRepo)("queue:Pharmacist");
    console.log("All patients data in queue:", prescriptionsData);
    const prescriptionsDelete = prescriptionsData.find(data => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed patient data:", parsedData);
        return parsedData && parsedData._id === prescriptionId;
      } catch (error) {
        console.error("Error parsing data:", error);
        return false;
      }
    });
    await (0, _prescriptionRepository.completePrescriptionRepository)(prescriptionsDelete._id, warehouseId);
    if (!prescriptionsDelete) {
      throw new Error("Patient not found");
    }
    console.log("Found patient to delete:", prescriptionsDelete);
    await removeFromQueue("queue:Pharmacist", prescriptionsDelete);
    return "Appointment completed successfully";
  } catch (err) {
    console.error("Error in completeAppointment:", err);
    throw err;
  }
};
exports.completePrescriptionService = completePrescriptionService;
const fetchPharmacist = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _pharmacistRepository.findPharmacist)(query);
};
exports.fetchPharmacist = fetchPharmacist;
const createPharmacistService = async pharmacistData => {
  try {
    return await (0, _pharmacistRepository.createPharmacist)(pharmacistData);
  } catch (error) {
    throw new Error("Error creating: " + error.message);
  }
};
exports.createPharmacistService = createPharmacistService;
const getOnePharmacistByIdService = async id => {
  try {
    const pharmacist = await (0, _pharmacistRepository.getOnePharmacistById)(id);
    if (!pharmacist) {
      throw new Error("Not found");
    }
    return pharmacist;
  } catch (error) {
    throw new Error("Error fetching: " + error.message);
  }
};
exports.getOnePharmacistByIdService = getOnePharmacistByIdService;
const getListPharmacistsService = async () => {
  try {
    return await (0, _pharmacistRepository.getListPharmacists)();
  } catch (error) {
    throw new Error("Error fetching list: " + error.message);
  }
};
exports.getListPharmacistsService = getListPharmacistsService;