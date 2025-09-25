"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inMemoryQueueRepository = exports.default = void 0;
var _priorityQueue = require("../utils/priorityQueue.js");
// Thay thế queueRepository.js sử dụng Redis bằng in-memory operations

/**
 * In-Memory Queue Repository
 * Thay thế Redis-based queue operations với in-memory operations
 */
class InMemoryQueueRepository {
  /**
   * Lấy tất cả appointments từ queue (thay thế getAppointmentsFromQueueRepo)
   * @param {string} queueKey - Queue key (room number)
   * @returns {string[]} - Array of patient data strings
   */
  async getAppointmentsFromQueueRepo(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      const patients = await _priorityQueue.priorityQueue.getAllPatientsFromQueue(roomNumber);

      // Convert to string format to match original Redis behavior
      return patients.map(patient => JSON.stringify(patient));
    } catch (err) {
      console.error('Error getting appointments from queue:', err);
      throw err;
    }
  }

  /**
   * Xóa appointment khỏi queue (thay thế removeFromQueueRepo)
   * @param {string} queueKey - Queue key (room number)
   * @param {string} patientDataString - Patient data string
   * @returns {boolean} - True if removed successfully
   */
  async removeFromQueueRepo(queueKey, patientDataString) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      const patientData = JSON.parse(patientDataString);
      return await _priorityQueue.priorityQueue.removePatientFromQueue(roomNumber, patientData.patientId);
    } catch (err) {
      console.error('Error removing from queue:', err);
      throw err;
    }
  }

  /**
   * Thêm appointment vào queue
   * @param {string} queueKey - Queue key (room number)
   * @param {Object} patientData - Patient data
   * @returns {boolean} - True if added successfully
   */
  async addToQueueRepo(queueKey, patientData) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      return await _priorityQueue.priorityQueue.addAppointmentToQueue(roomNumber, patientData);
    } catch (err) {
      console.error('Error adding to queue:', err);
      throw err;
    }
  }

  /**
   * Lấy appointment tiếp theo từ queue
   * @param {string} queueKey - Queue key (room number)
   * @returns {Object|null} - Next patient data or null
   */
  async getNextFromQueueRepo(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      return await _priorityQueue.priorityQueue.getNextPatientFromQueue(roomNumber);
    } catch (err) {
      console.error('Error getting next from queue:', err);
      throw err;
    }
  }

  /**
   * Lấy thống kê queue
   * @param {string} queueKey - Queue key (room number)
   * @returns {Object} - Queue statistics
   */
  async getQueueStatsRepo(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      return _priorityQueue.priorityQueue.getQueueStats(roomNumber);
    } catch (err) {
      console.error('Error getting queue stats:', err);
      throw err;
    }
  }

  /**
   * Xóa tất cả appointments khỏi queue
   * @param {string} queueKey - Queue key (room number)
   * @returns {boolean} - True if cleared successfully
   */
  async clearQueueRepo(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      const queue = _priorityQueue.priorityQueue.queues.get(roomNumber);
      if (queue) {
        queue.priority = [];
        queue.normal = [];
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error clearing queue:', err);
      throw err;
    }
  }

  /**
   * Lấy tất cả queue keys
   * @returns {string[]} - Array of queue keys
   */
  async getAllQueueKeys() {
    try {
      const keys = [];
      for (const queueKey of _priorityQueue.priorityQueue.queues.keys()) {
        keys.push(`queue:${queueKey}`);
      }
      return keys;
    } catch (err) {
      console.error('Error getting all queue keys:', err);
      throw err;
    }
  }

  /**
   * Kiểm tra queue có tồn tại không
   * @param {string} queueKey - Queue key (room number)
   * @returns {boolean} - True if queue exists
   */
  async queueExists(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      return _priorityQueue.priorityQueue.queues.has(roomNumber);
    } catch (err) {
      console.error('Error checking queue existence:', err);
      throw err;
    }
  }

  /**
   * Lấy kích thước queue
   * @param {string} queueKey - Queue key (room number)
   * @returns {number} - Queue size
   */
  async getQueueSize(queueKey) {
    try {
      const roomNumber = queueKey.replace('queue:', '');
      const stats = _priorityQueue.priorityQueue.getQueueStats(roomNumber);
      return stats.total;
    } catch (err) {
      console.error('Error getting queue size:', err);
      throw err;
    }
  }
}

// Singleton instance
const inMemoryQueueRepository = exports.inMemoryQueueRepository = new InMemoryQueueRepository();
var _default = exports.default = InMemoryQueueRepository;