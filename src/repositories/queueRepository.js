
// Thay thế Redis operations bằng in-memory queue operations
import { inMemoryQueueRepository } from "./inMemoryQueueRepository.js";

// Lấy danh sách các cuộc hẹn tại queue
export const getAppointmentsFromQueueRepo = async (queueKey) => {
  return await inMemoryQueueRepository.getAppointmentsFromQueueRepo(queueKey);
};

// Xoá 1 cuộc hẹn khỏi queue
export const removeFromQueueRepo = async (queueKey, dataToRemove) => {
  if (!dataToRemove) {
      throw new Error("dataToRemove is undefined or null");
  }

  // Log cho biết dữ liệu trước khi xóa
  console.log("Attempting to remove:", dataToRemove);

  try {
      const result = await inMemoryQueueRepository.removeFromQueueRepo(queueKey, dataToRemove);
      console.log("Removal result:", result);
      return result;
  } catch (error) {
      console.error("Error removing from queue:", error);
      throw error;
  }
};

// Thêm chèn đầu (priority patients)
export const addFirstAppointmentToQueue = async (queueKey, appointmentData) => {
  return await inMemoryQueueRepository.addToQueueRepo(queueKey, {
    ...appointmentData,
    priority: true
  });
}

// Thêm chèn cuối (normal patients)
export const addEndAppointmentToQueue = async (queueKey, appointmentData) => {
  return await inMemoryQueueRepository.addToQueueRepo(queueKey, {
    ...appointmentData,
    priority: false
  });
}