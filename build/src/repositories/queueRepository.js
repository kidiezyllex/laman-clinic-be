"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFromQueueRepo = exports.getAppointmentsFromQueueRepo = exports.addFirstAppointmentToQueue = exports.addEndAppointmentToQueue = void 0;
var _inMemoryQueueRepository = require("./inMemoryQueueRepository.js");
// Thay thế Redis operations bằng in-memory queue operations

// Lấy danh sách các cuộc hẹn tại queue
const getAppointmentsFromQueueRepo = async queueKey => {
  return await _inMemoryQueueRepository.inMemoryQueueRepository.getAppointmentsFromQueueRepo(queueKey);
};

// Xoá 1 cuộc hẹn khỏi queue
exports.getAppointmentsFromQueueRepo = getAppointmentsFromQueueRepo;
const removeFromQueueRepo = async (queueKey, dataToRemove) => {
  if (!dataToRemove) {
    throw new Error("dataToRemove is undefined or null");
  }

  // Log cho biết dữ liệu trước khi xóa
  console.log("Attempting to remove:", dataToRemove);
  try {
    const result = await _inMemoryQueueRepository.inMemoryQueueRepository.removeFromQueueRepo(queueKey, dataToRemove);
    console.log("Removal result:", result);
    return result;
  } catch (error) {
    console.error("Error removing from queue:", error);
    throw error;
  }
};

// Thêm chèn đầu (priority patients)
exports.removeFromQueueRepo = removeFromQueueRepo;
const addFirstAppointmentToQueue = async (queueKey, appointmentData) => {
  return await _inMemoryQueueRepository.inMemoryQueueRepository.addToQueueRepo(queueKey, {
    ...appointmentData,
    priority: true
  });
};

// Thêm chèn cuối (normal patients)
exports.addFirstAppointmentToQueue = addFirstAppointmentToQueue;
const addEndAppointmentToQueue = async (queueKey, appointmentData) => {
  return await _inMemoryQueueRepository.inMemoryQueueRepository.addToQueueRepo(queueKey, {
    ...appointmentData,
    priority: false
  });
};
exports.addEndAppointmentToQueue = addEndAppointmentToQueue;