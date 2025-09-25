"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDoctorOnlineStatusController = exports.getSpecializationsController = exports.getOneDoctorController = exports.getListDoctorsController = exports.getListAppointment = exports.getDepartmentNameController = exports.getAppointmentsByDateController = exports.createServiceListController = exports.createRequestTestController = exports.createReExaminationController = exports.createPrescriptionController = exports.createDoctorController = exports.completeAppointmentController = void 0;
var _queueRepository = require("../repositories/queueRepository.js");
var _doctorServices = require("../services/doctorServices.js");
// Tạo đơn thuốc
const createPrescriptionController = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      medications,
      dateIssued
    } = req.body;
    const result = await (0, _doctorServices.createPrescriptions)(patientId, doctorId, medications, dateIssued);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// []Tạo yêu cầu xét nghiệm
exports.createPrescriptionController = createPrescriptionController;
const createRequestTestController = async (req, res) => {
  try {
    const requestTestData = req.body;
    const newRequestTest = await (0, _doctorServices.createRequests)(requestTestData);
    res.status(201).json(newRequestTest);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Tạo danh sách dịch vụ
exports.createRequestTestController = createRequestTestController;
const createServiceListController = async (req, res) => {
  const {
    doctorId,
    patientId,
    services
  } = req.body;
  try {
    const serviceList = await (0, _doctorServices.createServiceList)(doctorId, patientId, services);
    res.status(200).json({
      message: "Service list created successfully.",
      serviceList
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
};

// Lấy danh sách cuộc hẹn
exports.createServiceListController = createServiceListController;
const getListAppointment = async (req, res) => {
  try {
    const appointment = await (0, _queueRepository.getAppointmentsFromQueueRepo)(req.params.roomNumber);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};
exports.getListAppointment = getListAppointment;
const getDepartmentNameController = async (req, res) => {
  try {
    const specializations = await getDepartmentName();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message
    });
  }
};

// Hoàn thành khám
exports.getDepartmentNameController = getDepartmentNameController;
const completeAppointmentController = async (req, res) => {
  try {
    const {
      roomNumber,
      patientId,
      doctorId
    } = req.body;
    const completeMessage = await (0, _doctorServices.completeAppointmentServices)(roomNumber, patientId, doctorId);
    res.status(200).json({
      success: true,
      message: completeMessage
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
};
exports.completeAppointmentController = completeAppointmentController;
const getSpecializationsController = async (req, res) => {
  try {
    const specializations = await (0, _doctorServices.fetchSpecializations)();
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message
    });
  }
};
exports.getSpecializationsController = getSpecializationsController;
const getOneDoctorController = async (req, res) => {
  try {
    const doctor = await (0, _doctorServices.getOneDoctor)(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOneDoctorController = getOneDoctorController;
const getListDoctorsController = async (req, res) => {
  try {
    const {
      email,
      specialization
    } = req.query;
    if (email) {
      const doctor = await (0, _doctorServices.getDoctorByEmail)(email);
      res.status(200).json(doctor);
    } else if (specialization) {
      const doctor = await (0, _doctorServices.getDoctorBySpecialization)(specialization);
      res.status(200).json(doctor);
    } else {
      const doctors = await (0, _doctorServices.getListDoctorsService)();
      res.status(200).json(doctors);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListDoctorsController = getListDoctorsController;
const getAppointmentsByDateController = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const dateString = req.params.date;
    const appointments = await (0, _doctorServices.getAppointmentsByDateService)(doctorId, dateString);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(error.statusCode || 500).json({
      message: error.message
    }); // Trả về status code từ error
  }
};

// Tạo 1 Bác sĩ
exports.getAppointmentsByDateController = getAppointmentsByDateController;
const createDoctorController = async (req, res) => {
  try {
    const doctorData = req.body;
    const newDoctor = await (0, _doctorServices.createDoctorService)(doctorData);
    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: newDoctor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Cập nhật 1 Bác sĩ
exports.createDoctorController = createDoctorController;
const updateDoctorOnlineStatusController = async (req, res) => {
  try {
    const {
      doctorId
    } = req.params;
    const {
      isOnline,
      roomNumber
    } = req.body;
    if (typeof isOnline !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isOnline must be a boolean value"
      });
    }
    if (typeof roomNumber !== "string" || roomNumber.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "roomNumber must be a non-empty string"
      });
    }
    const updatedDoctor = await (0, _doctorServices.updateDoctorOnlineStatusService)(doctorId, isOnline, roomNumber);
    res.status(200).json({
      success: true,
      message: "Doctor online status updated successfully",
      data: updatedDoctor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateDoctorOnlineStatusController = updateDoctorOnlineStatusController;
const createReExaminationController = async (req, res) => {
  try {
    const appointment = await (0, _doctorServices.createReExaminationServices)(req.body);
    res.status(200).json(appointment);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
exports.createReExaminationController = createReExaminationController;