"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDoctorOnlineStatusService = exports.getOneDoctor = exports.getListDoctorsService = exports.getDoctorBySpecialization = exports.getDoctorByEmail = exports.getAppointmentsByDateService = exports.fetchSpecializations = exports.fetchDoctors = exports.createServiceList = exports.createRequests = exports.createReExaminationServices = exports.createPrescriptions = exports.createDoctorService = exports.completeAppointmentServices = void 0;
var _messageQueue = require("../utils/messageQueue.js");
var _prescriptionRepository = require("../repositories/prescriptionRepository.js");
var _patientRepository = require("../repositories/patientRepository.js");
var _queueRepository = require("../repositories/queueRepository.js");
var _doctorRepository = require("../repositories/doctorRepository.js");
var _requestTestRepository = require("../repositories/requestTestRepository.js");
var _appointmentRepository = require("../repositories/appointmentRepository.js");
var _appointmentByPatientRepository = require("../repositories/appointmentByPatientRepository.js");
var _firebaseServices = require("./firebaseServices.js");
// import Doctor from "../models/Doctor.js";

const createPrescriptions = async (patientId, doctorId, medications, dateIssued) => {
  if (!patientId || !doctorId || !medications || !dateIssued) {
    throw new Error("patientId, doctorId và medications, dateIssued  là bắt buộc");
  }
  const prescriptionRequest = {
    patientId,
    doctorId,
    medications,
    dateIssued
  };
  const prescription = await (0, _prescriptionRepository.createPrescriptionRepo)(prescriptionRequest);
  try {
    await _messageQueue.messageQueue.sendMessage(`Pharmacist-Queue`, prescription);
    return {
      message: "Prescription has been accepted and is being processed"
    };
  } catch (err) {
    throw new Error("Unable to process the prescription request: " + err.message);
  }
};
exports.createPrescriptions = createPrescriptions;
const createServiceList = async (doctorId, patientId, services) => {
  const doctor = await (0, _doctorRepository.getOneDoctorById)(doctorId);
  const patient = await (0, _patientRepository.getOnePatientById)(patientId);
  if (!doctor || !patient) {
    throw new Error("Doctor or patient not found.");
  }
  const totalAmount = services.reduce((total, service) => total + service.cost, 0);
  const newServiceList = new ServiceList({
    doctorId: doctor._id,
    patientId: patient._id,
    services,
    totalAmount,
    status: "Pending"
  });
  return await newServiceList.save();
};

// Tạo và sao lưu lịch sử khám bệnh

// Hoàn thành khám
exports.createServiceList = createServiceList;
const completeAppointmentServices = async (roomNumber, patientId, doctorId) => {
  const queueKey = `queue:${roomNumber}`;
  try {
    const patientsData = await (0, _queueRepository.getAppointmentsFromQueueRepo)(queueKey);
    const patientToDelete = patientsData.find(data => {
      try {
        const parsedData = JSON.parse(data);
        console.log("Parsed patient data:", parsedData);
        return parsedData && parsedData.patientId === patientId;
      } catch (error) {
        console.error("Error parsing data:", error);
        return false;
      }
    });
    if (!patientToDelete) {
      throw new Error("Patient not found");
    }
    await (0, _queueRepository.removeFromQueueRepo)(queueKey, patientToDelete);
    // const appointmentData = await getOneAppointmentById(patientToDelete._id);
    const appointmentDatas = JSON.parse(patientToDelete);
    const appointmentData = await (0, _appointmentRepository.getOneAppointmentById)(appointmentDatas._id);
    appointmentData.status = "Completed";
    appointmentData.doctorId = doctorId;
    await appointmentData.save();
    const doctor = await (0, _doctorRepository.getOneDoctorById)(doctorId);
    await (0, _doctorRepository.updateDoctorByIdRepo)(doctorId, {
      $addToSet: {
        appointmentList: appointmentData
      }
    });
    await doctor.save();
    return "Appointment completed successfully";
  } catch (err) {
    console.error("Error in completeAppointment:", err);
    throw err;
  }
};

// Gọi bệnh nhân từ hàng đợi
// export const getAppointmentToQueue = async (roomNumber) => {
//   const queueKey = `queue:${roomNumber}`;

//   try {
//     const appointmentsData = await getAppointmentsFromQueue(queueKey);

//     // if (!appointmentsData.length) {
//     //   return res
//     //     .status(404)
//     //     .json({ success: false, message: "No patients in queue" });
//     // }

//     // Phân tích dữ liệu JSON và bỏ qua các dữ liệu không hợp lệ
//     const parsedAppointmentsData = appointmentsData
//       .map((data) => {
//         try {
//           return JSON.parse(data);
//         } catch (error) {
//           console.error(`Invalid JSON data: ${data}`);
//           return null; // Trả về null nếu dữ liệu không hợp lệ
//         }
//       })
//       .filter((data) => data !== null); // Lọc bỏ những phần tử không hợp lệ

//     return parsedAppointmentsData;
//   } catch (err) {
//     throw new Error({ success: false, message: "Internal Server Error" });
//   }
// };

// Tạo yêu cầu xét nghiệm
exports.completeAppointmentServices = completeAppointmentServices;
const createRequests = async requestTest => {
  const {
    patientId,
    doctorId,
    testTypes,
    reason,
    requestDate
  } = requestTest;
  if (!patientId || !doctorId || !testTypes || !reason || !requestDate) {
    throw new Error("patientId, doctorId và testType, reason, testName requestDate là bắt buộc!");
  }
  const patient = await (0, _patientRepository.getOnePatientById)(patientId);
  if (!patient) {
    throw new Error("Bệnh nhân này chưa tồn tại!");
  }
  const requestTests = await (0, _requestTestRepository.createRequestTest)(requestTest);
  return requestTests;
};
exports.createRequests = createRequests;
const fetchSpecializations = async () => {
  return await (0, _doctorRepository.getSpecializations)();
};
exports.fetchSpecializations = fetchSpecializations;
const getListDoctorsService = async () => {
  return await (0, _doctorRepository.getListDoctors)();
};
exports.getListDoctorsService = getListDoctorsService;
const getOneDoctor = async id => {
  return await (0, _doctorRepository.getOneDoctorById)(id);
};
exports.getOneDoctor = getOneDoctor;
const fetchDoctors = async (specialization, email) => {
  let query = {};
  if (specialization) {
    query.specialization = specialization;
  }
  if (email) {
    query.email = email;
  }
  return await (0, _doctorRepository.findDoctors)(query);
};
exports.fetchDoctors = fetchDoctors;
const getAppointmentsByDateService = async (doctorId, dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) {
      const error = new Error("Invalid date format. Please use YYYY-MM-DD.");
      error.statusCode = 400; // Gán status code cho error
      throw error;
    }
    const appointments = await (0, _doctorRepository.getAppointmentsByDateRepository)(doctorId, date);
    return appointments;
  } catch (error) {
    //  Thêm status code vào error nếu cần
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    throw error; // Ném lỗi lên controller để xử lý
  }
};

// Tạo 1 Bác sĩ
exports.getAppointmentsByDateService = getAppointmentsByDateService;
const createDoctorService = async doctorData => {
  try {
    const newDoctor = await (0, _doctorRepository.createDoctor)(doctorData);
    return newDoctor;
  } catch (error) {
    throw new Error("Error creating doctor: " + error.message);
  }
};

// Update 1 Bác sĩ
exports.createDoctorService = createDoctorService;
const updateDoctorOnlineStatusService = async (doctorId, isOnline, roomNumber) => {
  try {
    const updatedDoctor = await (0, _doctorRepository.updateDoctorOnlineStatus)(doctorId, isOnline, roomNumber);
    if (!updatedDoctor) {
      throw new Error("Doctor not found");
    }
    return updatedDoctor;
  } catch (error) {
    throw new Error("Error updating doctor online status: " + error.message);
  }
};

// Tạo lịch tái khám
exports.updateDoctorOnlineStatusService = updateDoctorOnlineStatusService;
const createReExaminationServices = async appointmentData => {
  const {
    patientId,
    appointmentDateByPatient,
    specialization,
    reason
  } = appointmentData;
  if (!patientId || !appointmentDateByPatient || !specialization || !reason) {
    throw new Error("patientId hoặc appointmentDateByPatient hoặc specialization hoặc reason là bắt buộc");
  }
  const patient = await (0, _patientRepository.getOnePatientById)(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }
  const appointment = await (0, _appointmentByPatientRepository.createAppointmentByPatientRepo)({
    ...appointmentData,
    reExamination: true
  });
  await appointment.save();
  return appointment;
};
exports.createReExaminationServices = createReExaminationServices;
const getDoctorByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _doctorRepository.findDoctor)(query);
};
exports.getDoctorByEmail = getDoctorByEmail;
const getDoctorBySpecialization = async specialization => {
  let query = {};
  if (specialization) {
    query.specialization = specialization;
  }
  return await (0, _doctorRepository.findDoctors)(query);
};
exports.getDoctorBySpecialization = getDoctorBySpecialization;