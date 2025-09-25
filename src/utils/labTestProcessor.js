// Thay thế Kafka labTestConsumer bằng in-memory processor
import LaboratoryTechnician from '../models/LaboratoryTechnician.js';
import { priorityQueue } from "./priorityQueue.js";
import { messageQueue } from "./messageQueue.js";

/**
 * Lab Test Queue Processor
 * Thay thế Kafka labTestConsumer với in-memory processing
 */
class LabTestProcessor {
  constructor() {
    this.isRunning = false;
  }

  /**
   * Khởi động processor (thay thế runConsumerLabTest)
   */
  async start() {
    try {
      console.log("Lab Test Processor started");
      this.isRunning = true;

      // Subscribe to lab test queue messages
      messageQueue.subscribe('LabTest-Queue', this.processLabTestQueueMessage.bind(this));
      
      // Start processing loop
      this.startProcessingLoop();
      
      return true;
    } catch (err) {
      console.error("Failed to start Lab Test Processor", err);
      throw err;
    }
  }

  /**
   * Dừng processor
   */
  async stop() {
    this.isRunning = false;
    console.log("Lab Test Processor stopped");
  }

  /**
   * Xử lý tin nhắn từ hàng đợi xét nghiệm (thay thế processLabTestQueueMessage)
   * @param {Object} message - Message data
   */
  async processLabTestQueueMessage(message) {
    console.log(`Received lab test message: ${JSON.stringify(message)}`);
    
    try {
      const { patientId, testName } = message;

      // Thêm yêu cầu xét nghiệm vào queue
      await priorityQueue.addRequestTestToQueue(testName, message);
      
      console.log(`Bệnh nhân ${patientId} đã được phân xét nghiệm ${testName}`);
      
    } catch (err) {
      console.error('Lỗi khi xử lý tin nhắn từ hàng đợi:', err);
    }
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
        console.error("Error in lab test processing loop:", err);
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
    const message = messageQueue.dequeue('LabTest-Queue');
    if (message) {
      await this.processLabTestQueueMessage(message);
    }
  }

  /**
   * Lấy yêu cầu xét nghiệm tiếp theo từ queue
   * @param {string} testName - Test name
   * @returns {Object|null} - Next test request or null
   */
  async getNextTestRequest(testName) {
    try {
      const queueKey = `LabTest-${testName}`;
      const queue = priorityQueue.queues.get(queueKey);
      
      if (!queue || (queue.priority.length === 0 && queue.normal.length === 0)) {
        return null;
      }

      // Ưu tiên test request có priority trước
      if (queue.priority.length > 0) {
        return queue.priority.shift();
      }
      return queue.normal.shift();
    } catch (err) {
      console.error("Error getting next test request:", err);
      throw err;
    }
  }

  /**
   * Lấy tất cả yêu cầu xét nghiệm trong queue
   * @param {string} testName - Test name
   * @returns {Object[]} - Array of test requests
   */
  async getAllTestRequests(testName) {
    try {
      const queueKey = `LabTest-${testName}`;
      return await priorityQueue.getAllPatientsFromQueue(queueKey);
    } catch (err) {
      console.error("Error getting all test requests:", err);
      throw err;
    }
  }

  /**
   * Xóa yêu cầu xét nghiệm khỏi queue
   * @param {string} testName - Test name
   * @param {string} requestId - Request ID
   * @returns {boolean} - True if removed successfully
   */
  async removeTestRequest(testName, requestId) {
    try {
      const queueKey = `LabTest-${testName}`;
      return await priorityQueue.removePatientFromQueue(queueKey, requestId);
    } catch (err) {
      console.error("Error removing test request:", err);
      throw err;
    }
  }

  /**
   * Lấy danh sách tất cả test types có trong queue
   * @returns {string[]} - Array of test names
   */
  async getAvailableTestTypes() {
    try {
      const testTypes = [];
      for (const queueKey of priorityQueue.queues.keys()) {
        if (queueKey.startsWith('LabTest-')) {
          const testName = queueKey.replace('LabTest-', '');
          testTypes.push(testName);
        }
      }
      return testTypes;
    } catch (err) {
      console.error("Error getting available test types:", err);
      throw err;
    }
  }

  /**
   * Lấy thống kê processor
   * @returns {Object} - Processor statistics
   */
  getStats() {
    const testTypes = this.getAvailableTestTypes();
    const queueStats = {};
    
    for (const testType of testTypes) {
      const queueKey = `LabTest-${testType}`;
      queueStats[testType] = priorityQueue.getQueueStats(queueKey);
    }

    return {
      isRunning: this.isRunning,
      testTypes: testTypes,
      queueStats: queueStats,
      messageQueueStats: messageQueue.getStats()
    };
  }
}

// Singleton instance
const labTestProcessor = new LabTestProcessor();

export { labTestProcessor };
export default LabTestProcessor;
