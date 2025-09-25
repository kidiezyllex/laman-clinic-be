// Thay thế Kafka departmentConsumer bằng in-memory processor
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import { priorityQueue } from "./priorityQueue.js";
import { messageQueue } from "./messageQueue.js";

/**
 * Department Queue Processor
 * Thay thế Kafka departmentConsumer với in-memory processing
 */
class DepartmentProcessor {
  constructor() {
    this.roundRobinCounters = new Map(); // { specialization: currentIndex }
    this.isRunning = false;
  }

  /**
   * Khởi động processor (thay thế runConsumerDepartment)
   */
  async start() {
    try {
      console.log("Department Processor started");
      this.isRunning = true;

      // Subscribe to department queue messages
      messageQueue.subscribe(/department-.*-queue/, this.processDepartmentQueueMessage.bind(this));
      
      // Start processing loop
      this.startProcessingLoop();
      
      return true;
    } catch (err) {
      console.error("Failed to start Department Processor", err);
      throw err;
    }
  }

  /**
   * Dừng processor
   */
  async stop() {
    this.isRunning = false;
    console.log("Department Processor stopped");
  }

  /**
   * Xử lý tin nhắn từ hàng đợi chuyên khoa (thay thế processDepartmentQueueMessage)
   * @param {Object} message - Message data
   */
  async processDepartmentQueueMessage(message) {
    console.log(`Received message: ${JSON.stringify(message)}`);
    
    try {
      const { patientId, specialization, priority } = message;

      // Tìm bác sĩ theo chuyên khoa và đang online
      const doctors = await Doctor.find({ specialization, isOnline: true });

      if (doctors.length === 0) {
        console.log(`Không có bác sĩ nào trong chuyên khoa ${specialization}`);
        return;
      }

      // Round-robin selection
      const selectedIndex = this.getRoundRobinIndex(specialization, doctors.length);
      const selectedDoctor = doctors[selectedIndex];
      const selectedRoom = selectedDoctor.roomNumber;

      // Thêm bệnh nhân vào queue phòng khám
      await priorityQueue.addAppointmentToQueue(selectedRoom, message);
      
      console.log(`Bệnh nhân ${patientId} đã được phân công cho bác sĩ ${selectedDoctor._id}`);

      // Cập nhật appointment với doctorId
      const appointment = await Appointment.findOne({ patientId });
      if (appointment) {
        await appointment.updateOne({ doctorId: selectedDoctor._id });
      }

      console.log(`Bệnh nhân ${patientId} đã được thêm vào hàng đợi phòng khám ${selectedRoom}`);
      
    } catch (err) {
      console.error("Lỗi khi xử lý tin nhắn từ hàng đợi:", err);
    }
  }

  /**
   * Round-robin counter cho specialization
   * @param {string} specialization - Specialization name
   * @param {number} maxCount - Maximum count for round-robin
   * @returns {number} - Current index
   */
  getRoundRobinIndex(specialization, maxCount) {
    const currentIndex = this.roundRobinCounters.get(specialization) || 0;
    const nextIndex = (currentIndex + 1) % maxCount;
    this.roundRobinCounters.set(specialization, nextIndex);
    return currentIndex;
  }

  /**
   * Processing loop để xử lý messages liên tục
   */
  startProcessingLoop() {
    const processLoop = async () => {
      if (!this.isRunning) return;

      try {
        // Process any pending messages
        await this.processPendingMessages();
      } catch (err) {
        console.error("Error in processing loop:", err);
      }

      // Schedule next iteration
      setTimeout(processLoop, 1000); // Process every second
    };

    processLoop();
  }

  /**
   * Xử lý các messages đang chờ
   */
  async processPendingMessages() {
    // Get all department queue topics
    const departmentTopics = Array.from(messageQueue.queues.keys())
      .filter(topic => topic.startsWith('department-') && topic.endsWith('-queue'));

    for (const topic of departmentTopics) {
      const message = messageQueue.dequeue(topic);
      if (message) {
        await this.processDepartmentQueueMessage(message);
      }
    }
  }

  /**
   * Xử lý khi bệnh nhân đã khám xong
   * @param {string} roomNumber - Room number
   */
  async processPatientFinished(roomNumber) {
    console.log(`Patient finished in exam room ${roomNumber}`);
    
    // Có thể thêm logic xử lý sau khi bệnh nhân khám xong
    // Ví dụ: gửi notification, cập nhật statistics, etc.
  }

  /**
   * Lấy thống kê processor
   * @returns {Object} - Processor statistics
   */
  getStats() {
    return {
      isRunning: this.isRunning,
      roundRobinCounters: Object.fromEntries(this.roundRobinCounters),
      queueStats: messageQueue.getStats()
    };
  }
}

// Singleton instance
const departmentProcessor = new DepartmentProcessor();

export { departmentProcessor };
export default DepartmentProcessor;
