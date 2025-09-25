"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.priorityQueue = exports.default = void 0;
var _events = require("events");
// Thay thế Redis queue operations bằng in-memory priority queue

/**
 * Priority Queue System
 * Thay thế Redis queue operations với in-memory priority queues
 */
class PriorityQueue extends _events.EventEmitter {
  constructor() {
    super();
    this.queues = new Map(); // roomNumber -> {priority: [], normal: []}
    this.isConnected = true; // Simulate connection status
  }

  /**
   * Thêm bệnh nhân vào queue với priority support
   * @param {string} roomNumber - Room number
   * @param {Object} patientData - Patient data
   */
  async addAppointmentToQueue(roomNumber, patientData) {
    try {
      if (!this.queues.has(roomNumber)) {
        this.queues.set(roomNumber, {
          priority: [],
          normal: []
        });
      }
      const queue = this.queues.get(roomNumber);
      if (patientData.priority) {
        // Bệnh nhân ưu tiên được đẩy lên đầu
        queue.priority.push(patientData);
        console.log(`Bệnh nhân ưu tiên ${patientData.patientId} đã được thêm vào đầu danh sách chờ.`);
      } else {
        // Bệnh nhân bình thường vào cuối
        queue.normal.push(patientData);
        console.log(`Bệnh nhân ${patientData.patientId} đã được thêm vào cuối danh sách chờ.`);
      }

      // Emit event for real-time updates
      this.emit('queueUpdated', {
        roomNumber,
        patientData,
        action: 'added'
      });
      return true;
    } catch (err) {
      console.error('Lỗi khi thêm bệnh nhân vào hàng đợi:', err);
      throw err;
    }
  }

  /**
   * Thêm đơn thuốc vào queue dược sĩ
   * @param {Object} prescriptionData - Prescription data
   */
  async addPrescriptionToQueue(prescriptionData) {
    try {
      const queueKey = 'Pharmacist';
      if (!this.queues.has(queueKey)) {
        this.queues.set(queueKey, {
          priority: [],
          normal: []
        });
      }
      const queue = this.queues.get(queueKey);
      queue.normal.push(prescriptionData);
      console.log(`Đơn thuốc đã được thêm vào queue dược sĩ`);
      this.emit('prescriptionAdded', prescriptionData);
      return true;
    } catch (err) {
      console.error('Error adding prescription to queue:', err);
      throw err;
    }
  }

  /**
   * Thêm yêu cầu xét nghiệm vào queue
   * @param {string} testName - Test name
   * @param {Object} requestTestData - Request test data
   */
  async addRequestTestToQueue(testName, requestTestData) {
    try {
      const queueKey = `LabTest-${testName}`;
      if (!this.queues.has(queueKey)) {
        this.queues.set(queueKey, {
          priority: [],
          normal: []
        });
      }
      const queue = this.queues.get(queueKey);
      queue.normal.push(requestTestData);
      console.log(`Yêu cầu xét nghiệm ${testName} đã được thêm vào queue`);
      this.emit('testRequestAdded', {
        testName,
        requestTestData
      });
      return true;
    } catch (err) {
      console.error('Error adding test request to queue:', err);
      throw err;
    }
  }

  /**
   * Lấy bệnh nhân tiếp theo từ queue (ưu tiên priority trước)
   * @param {string} roomNumber - Room number
   * @returns {Object|null} - Next patient data or null
   */
  async getNextPatientFromQueue(roomNumber) {
    try {
      const queue = this.queues.get(roomNumber);
      if (!queue) {
        console.log(`No patients in queue for room ${roomNumber}`);
        return null;
      }
      let patientData = null;

      // Ưu tiên bệnh nhân priority trước
      if (queue.priority.length > 0) {
        patientData = queue.priority.shift();
      } else if (queue.normal.length > 0) {
        patientData = queue.normal.shift();
      }
      if (patientData) {
        console.log(`Processing patient ${patientData.patientId} in room ${roomNumber}`);
        this.emit('patientProcessed', {
          roomNumber,
          patientData
        });
      } else {
        console.log(`No patients in queue for room ${roomNumber}`);
      }
      return patientData;
    } catch (err) {
      console.error('Error getting from queue:', err);
      throw err;
    }
  }

  /**
   * Lấy tất cả bệnh nhân trong queue
   * @param {string} roomNumber - Room number
   * @returns {Object[]} - Array of patient data
   */
  async getAllPatientsFromQueue(roomNumber) {
    try {
      const queue = this.queues.get(roomNumber);
      if (!queue) {
        return [];
      }

      // Kết hợp priority và normal queues, priority trước
      return [...queue.priority, ...queue.normal];
    } catch (err) {
      console.error('Error getting all patients from queue:', err);
      throw err;
    }
  }

  /**
   * Xóa bệnh nhân khỏi queue
   * @param {string} roomNumber - Room number
   * @param {string} patientId - Patient ID
   * @returns {boolean} - True if patient was found and removed
   */
  async removePatientFromQueue(roomNumber, patientId) {
    try {
      const queue = this.queues.get(roomNumber);
      if (!queue) {
        console.log(`Bệnh nhân với ID ${patientId} không có trong hàng đợi phòng ${roomNumber}`);
        return false;
      }

      // Tìm trong priority queue
      const priorityIndex = queue.priority.findIndex(patient => patient.patientId === patientId);
      if (priorityIndex !== -1) {
        queue.priority.splice(priorityIndex, 1);
        console.log(`Bệnh nhân ${patientId} đã được xóa khỏi hàng đợi phòng ${roomNumber}`);
        this.emit('patientRemoved', {
          roomNumber,
          patientId
        });
        return true;
      }

      // Tìm trong normal queue
      const normalIndex = queue.normal.findIndex(patient => patient.patientId === patientId);
      if (normalIndex !== -1) {
        queue.normal.splice(normalIndex, 1);
        console.log(`Bệnh nhân ${patientId} đã được xóa khỏi hàng đợi phòng ${roomNumber}`);
        this.emit('patientRemoved', {
          roomNumber,
          patientId
        });
        return true;
      }
      console.log(`Bệnh nhân với ID ${patientId} không có trong hàng đợi phòng ${roomNumber}`);
      return false;
    } catch (err) {
      console.error('Lỗi khi xóa bệnh nhân khỏi hàng đợi:', err);
      throw err;
    }
  }

  /**
   * Lấy thống kê queue
   * @param {string} roomNumber - Room number (optional)
   * @returns {Object} - Queue statistics
   */
  getQueueStats(roomNumber = null) {
    if (roomNumber) {
      const queue = this.queues.get(roomNumber);
      if (!queue) {
        return {
          priority: 0,
          normal: 0,
          total: 0
        };
      }
      return {
        priority: queue.priority.length,
        normal: queue.normal.length,
        total: queue.priority.length + queue.normal.length
      };
    }

    // Return stats for all queues
    const stats = {};
    for (const [room, queue] of this.queues) {
      stats[room] = {
        priority: queue.priority.length,
        normal: queue.normal.length,
        total: queue.priority.length + queue.normal.length
      };
    }
    return stats;
  }

  /**
   * Clear all queues
   */
  async clearAllQueues() {
    try {
      this.queues.clear();
      console.log('All queues cleared');
      this.emit('queuesCleared');
      return true;
    } catch (err) {
      console.error('Error clearing queues:', err);
      throw err;
    }
  }

  /**
   * Simulate connection
   */
  async connect() {
    this.isConnected = true;
    console.log('Priority Queue connected');
  }

  /**
   * Simulate disconnection
   */
  async disconnect() {
    this.isConnected = false;
    console.log('Priority Queue disconnected');
  }
}

// Singleton instance
const priorityQueue = exports.priorityQueue = new PriorityQueue();
var _default = exports.default = PriorityQueue;