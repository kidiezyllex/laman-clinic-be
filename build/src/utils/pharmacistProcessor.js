"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pharmacistProcessor = exports.default = void 0;
var _priorityQueue = require("./priorityQueue.js");
var _messageQueue = require("./messageQueue.js");
// Thay thế Kafka pharmacistConsumer bằng in-memory processor

/**
 * Pharmacist Queue Processor
 * Thay thế Kafka pharmacistConsumer với in-memory processing
 */
class PharmacistProcessor {
  constructor() {
    this.isRunning = false;
  }

  /**
   * Khởi động processor (thay thế runConsumerPharmacist)
   */
  async start() {
    try {
      console.log("Pharmacist Processor started");
      this.isRunning = true;

      // Subscribe to pharmacist queue messages
      _messageQueue.messageQueue.subscribe('Pharmacist-Queue', this.processPharmacistQueueMessage.bind(this));

      // Start processing loop
      this.startProcessingLoop();
      return true;
    } catch (err) {
      console.error("Failed to start Pharmacist Processor", err);
      throw err;
    }
  }

  /**
   * Dừng processor
   */
  async stop() {
    this.isRunning = false;
    console.log("Pharmacist Processor stopped");
  }

  /**
   * Xử lý tin nhắn từ hàng đợi dược sĩ (thay thế processPharmacistQueueMessage)
   * @param {Object} message - Message data
   */
  async processPharmacistQueueMessage(message) {
    console.log(`Received pharmacist message: ${JSON.stringify(message)}`);
    try {
      // Thêm đơn thuốc vào queue dược sĩ
      await _priorityQueue.priorityQueue.addPrescriptionToQueue(message);
      console.log(`Đơn thuốc đã được xử lý và thêm vào queue dược sĩ`);
    } catch (err) {
      console.error("Error processing pharmacist queue message", err);
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
        console.error("Error in pharmacist processing loop:", err);
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
    const message = _messageQueue.messageQueue.dequeue('Pharmacist-Queue');
    if (message) {
      await this.processPharmacistQueueMessage(message);
    }
  }

  /**
   * Lấy đơn thuốc tiếp theo từ queue
   * @returns {Object|null} - Next prescription or null
   */
  async getNextPrescription() {
    try {
      const queue = _priorityQueue.priorityQueue.queues.get('Pharmacist');
      if (!queue || queue.priority.length === 0 && queue.normal.length === 0) {
        return null;
      }

      // Ưu tiên prescription có priority trước
      if (queue.priority.length > 0) {
        return queue.priority.shift();
      }
      return queue.normal.shift();
    } catch (err) {
      console.error("Error getting next prescription:", err);
      throw err;
    }
  }

  /**
   * Lấy tất cả đơn thuốc trong queue
   * @returns {Object[]} - Array of prescriptions
   */
  async getAllPrescriptions() {
    try {
      return await _priorityQueue.priorityQueue.getAllPatientsFromQueue('Pharmacist');
    } catch (err) {
      console.error("Error getting all prescriptions:", err);
      throw err;
    }
  }

  /**
   * Xóa đơn thuốc khỏi queue
   * @param {string} prescriptionId - Prescription ID
   * @returns {boolean} - True if removed successfully
   */
  async removePrescription(prescriptionId) {
    try {
      return await _priorityQueue.priorityQueue.removePatientFromQueue('Pharmacist', prescriptionId);
    } catch (err) {
      console.error("Error removing prescription:", err);
      throw err;
    }
  }

  /**
   * Lấy thống kê processor
   * @returns {Object} - Processor statistics
   */
  getStats() {
    return {
      isRunning: this.isRunning,
      queueStats: _priorityQueue.priorityQueue.getQueueStats('Pharmacist'),
      messageQueueStats: _messageQueue.messageQueue.getStats()
    };
  }
}

// Singleton instance
const pharmacistProcessor = exports.pharmacistProcessor = new PharmacistProcessor();
var _default = exports.default = PharmacistProcessor;