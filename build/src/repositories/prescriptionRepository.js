"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePrescriptionByIdRepo = exports.getOnePrescriptionByIdRepo = exports.getMedicationFluctuationsRepo = exports.getListPrescriptionsRepo = exports.getAppointmentIdsByDoctorIdRepo = exports.findPrescriptionByAppointmentId = exports.deletePrescriptionByIdRepo = exports.createPrescriptionRepo = exports.completePrescriptionRepository = exports.checkPrescriptionByAppointmentIdRepo = void 0;
var _Prescription = _interopRequireDefault(require("../models/Prescription.js"));
var _MedicineWarehouse = _interopRequireDefault(require("../models/MedicineWarehouse.js"));
var _Medication = _interopRequireDefault(require("../models/Medication.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getAppointmentIdsByDoctorIdRepo = async doctorId => {
  const prescriptions = await _Prescription.default.find({
    doctorId
  }, "appointmentId");
  return prescriptions.map(prescription => prescription.appointmentId);
};
exports.getAppointmentIdsByDoctorIdRepo = getAppointmentIdsByDoctorIdRepo;
const checkPrescriptionByAppointmentIdRepo = async appointmentId => {
  return await _Prescription.default.exists({
    appointmentId
  });
};
exports.checkPrescriptionByAppointmentIdRepo = checkPrescriptionByAppointmentIdRepo;
const createPrescriptionRepo = async prescriptionData => {
  const prescription = new _Prescription.default(prescriptionData);
  return await prescription.save();
};
exports.createPrescriptionRepo = createPrescriptionRepo;
const findPrescriptionByAppointmentId = async query => {
  return await _Prescription.default.findOne(query);
};
exports.findPrescriptionByAppointmentId = findPrescriptionByAppointmentId;
const getListPrescriptionsRepo = async () => {
  return await _Prescription.default.find();
};
exports.getListPrescriptionsRepo = getListPrescriptionsRepo;
const getOnePrescriptionByIdRepo = async id => {
  return await _Prescription.default.findById(id);
};
exports.getOnePrescriptionByIdRepo = getOnePrescriptionByIdRepo;
const updatePrescriptionByIdRepo = async (id, updateData) => {
  return await _Prescription.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updatePrescriptionByIdRepo = updatePrescriptionByIdRepo;
const deletePrescriptionByIdRepo = async id => {
  return await _Prescription.default.findByIdAndDelete(id);
};
exports.deletePrescriptionByIdRepo = deletePrescriptionByIdRepo;
const completePrescriptionRepository = async (prescriptionId, warehouseId) => {
  try {
    const prescription = await _Prescription.default.findById(prescriptionId).populate("medications");
    if (!prescription) {
      throw new Error("Prescription not found");
    }
    const warehouse = await _MedicineWarehouse.default.findById(warehouseId);
    if (!warehouse) {
      throw new Error("Medicine warehouse not found");
    }

    // Cập nhật số lượng thuốc trong kho
    for (const medicationItem of prescription.medications) {
      const warehouseMedication = warehouse.medications.find(item => item.medication.toString() === medicationItem.medication._id.toString() // So sánh _id của thuốc
      );
      if (warehouseMedication) {
        const medication = await _Medication.default.findById(medicationItem.medication._id);
        if (warehouseMedication.quantity < medicationItem.quantity) {
          throw new Error(`Not enough ${medication.medicationName} in stock`);
        }
        warehouseMedication.quantity -= medicationItem.quantity;
        await warehouse.save();
      } else {
        throw new Error(`${medicationItem.medication.medicationName} not found in warehouse`);
      }
      prescription.status = "Completed";
      await prescription.save();
    }
    return prescription;
  } catch (error) {
    throw error;
  }
};
exports.completePrescriptionRepository = completePrescriptionRepository;
const getMedicationFluctuationsRepo = async () => {
  const prescriptions = await _Prescription.default.find({
    status: "Completed"
  });
  const medicationMap = new Map();
  prescriptions.forEach(prescription => {
    prescription.medications.forEach(medication => {
      if (!medicationMap.has(medication.medicationName)) {
        medicationMap.set(medication.medicationName, []);
      }
      medicationMap.get(medication.medicationName).push({
        _id: prescription._id,
        quantity: medication.quantity,
        dateIssued: prescription.dateIssued
      });
    });
  });
  return Array.from(medicationMap, ([medicationName, prescriptions]) => ({
    medicationName,
    prescriptions
  }));
};
exports.getMedicationFluctuationsRepo = getMedicationFluctuationsRepo;