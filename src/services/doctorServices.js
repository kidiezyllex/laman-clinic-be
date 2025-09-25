import { messageQueue } from "../utils/messageQueue.js";
import { createPrescriptionRepo } from "../repositories/prescriptionRepository.js";
import { getOnePatientById } from "../repositories/patientRepository.js";
import {
  // getAppointmentsFromQueue,
  getAppointmentsFromQueueRepo,
  removeFromQueueRepo,
} from "../repositories/queueRepository.js";
import {
  createDoctor,
  findDoctors,
  getAppointmentsByDateRepository,
  getListDoctors,
  getOneDoctorById,
  getSpecializations,
  updateDoctorOnlineStatus,
  findDoctor,
  updateDoctorByIdRepo,
} from "../repositories/doctorRepository.js";
import { createRequestTest } from "../repositories/requestTestRepository.js";
import {
  createAppointment,
  getOneAppointmentById,
} from "../repositories/appointmentRepository.js";
// import Doctor from "../models/Doctor.js";
import { createAppointmentByPatientRepo } from "../repositories/appointmentByPatientRepository.js";
import { sendNotificationToRole } from "./firebaseServices.js";

export const createPrescriptions = async (
  patientId,
  doctorId,
  medications,
  dateIssued
) => {
  if (!patientId || !doctorId || !medications || !dateIssued) {
    throw new Error(
      "patientId, doctorId và medications, dateIssued  là bắt buộc"
    );
  }
  const prescriptionRequest = {
    patientId,
    doctorId,
    medications,
    dateIssued,
  };
  const prescription = await createPrescriptionRepo(prescriptionRequest);

  try {
    await messageQueue.sendMessage(`Pharmacist-Queue`, prescription);
    return { message: "Prescription has been accepted and is being processed" };
  } catch (err) {
    throw new Error(
      "Unable to process the prescription request: " + err.message
    );
  }
};

export const createServiceList = async (doctorId, patientId, services) => {
  const doctor = await getOneDoctorById(doctorId);
  const patient = await getOnePatientById(patientId);

  if (!doctor || !patient) {
    throw new Error("Doctor or patient not found.");
  }

  const totalAmount = services.reduce(
    (total, service) => total + service.cost,
    0
  );

  const newServiceList = new ServiceList({
    doctorId: doctor._id,
    patientId: patient._id,
    services,
    totalAmount,
    status: "Pending",
  });

  return await newServiceList.save();
};

// Tạo và sao lưu lịch sử khám bệnh

// Hoàn thành khám
export const completeAppointmentServices = async (
  roomNumber,
  patientId,
  doctorId
) => {
  const queueKey = `queue:${roomNumber}`;

  try {
    const patientsData = await getAppointmentsFromQueueRepo(queueKey);
    const patientToDelete = patientsData.find((data) => {
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

    await removeFromQueueRepo(queueKey, patientToDelete);
    // const appointmentData = await getOneAppointmentById(patientToDelete._id);
    const appointmentDatas = JSON.parse(patientToDelete);
    const appointmentData = await getOneAppointmentById(appointmentDatas._id);

    appointmentData.status = "Completed";
    appointmentData.doctorId = doctorId;
    await appointmentData.save();

    const doctor = await getOneDoctorById(doctorId);

    await updateDoctorByIdRepo(doctorId, {
      $addToSet: { appointmentList: appointmentData },
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
export const createRequests = async (requestTest) => {
  const { patientId, doctorId, testTypes, reason, requestDate } = requestTest;
  if (!patientId || !doctorId || !testTypes || !reason || !requestDate) {
    throw new Error(
      "patientId, doctorId và testType, reason, testName requestDate là bắt buộc!"
    );
  }

  const patient = await getOnePatientById(patientId);
  if (!patient) {
    throw new Error("Bệnh nhân này chưa tồn tại!");
  }

  const requestTests = await createRequestTest(requestTest);
  return requestTests;
};

export const fetchSpecializations = async () => {
  return await getSpecializations();
};

export const getListDoctorsService = async () => {
  return await getListDoctors();
};

export const getOneDoctor = async (id) => {
  return await getOneDoctorById(id);
};

export const fetchDoctors = async (specialization, email) => {
  let query = {};

  if (specialization) {
    query.specialization = specialization;
  }

  if (email) {
    query.email = email;
  }

  return await findDoctors(query);
};

export const getAppointmentsByDateService = async (doctorId, dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) {
      const error = new Error("Invalid date format. Please use YYYY-MM-DD.");
      error.statusCode = 400; // Gán status code cho error
      throw error;
    }

    const appointments = await getAppointmentsByDateRepository(doctorId, date);
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
export const createDoctorService = async (doctorData) => {
  try {
    const newDoctor = await createDoctor(doctorData);
    return newDoctor;
  } catch (error) {
    throw new Error("Error creating doctor: " + error.message);
  }
};

// Update 1 Bác sĩ
export const updateDoctorOnlineStatusService = async (
  doctorId,
  isOnline,
  roomNumber
) => {
  try {
    const updatedDoctor = await updateDoctorOnlineStatus(
      doctorId,
      isOnline,
      roomNumber
    );
    if (!updatedDoctor) {
      throw new Error("Doctor not found");
    }
    return updatedDoctor;
  } catch (error) {
    throw new Error("Error updating doctor online status: " + error.message);
  }
};

// Tạo lịch tái khám
export const createReExaminationServices = async (appointmentData) => {
  const {
    patientId,
    appointmentDateByPatient,
    specialization,
    reason,
  } = appointmentData;

  if (!patientId || !appointmentDateByPatient || !specialization || !reason) {
    throw new Error(
      "patientId hoặc appointmentDateByPatient hoặc specialization hoặc reason là bắt buộc"
    );
  }

  const patient = await getOnePatientById(patientId);
  if (!patient) {
    throw new Error("bệnh nhân này chưa tồn tại");
  }
  const appointment = await createAppointmentByPatientRepo({
    ...appointmentData,
    reExamination: true,
  });
  await appointment.save();

  return appointment;
};

export const getDoctorByEmail = async (email) => {
  let query = {};
  if (email) {
    query.email = email;
  }

  return await findDoctor(query);
};

export const getDoctorBySpecialization = async (specialization) => {
  let query = {};
  if (specialization) {
    query.specialization = specialization;
  }

  return await findDoctors(query);
};
