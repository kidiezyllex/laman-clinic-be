// Thay thế Kafka bằng EventEmitter và in-memory queues
import { EventEmitter } from 'events';

/**
 * In-Memory Message Queue System
 * Thay thế Kafka producer/consumer bằng EventEmitter và Map-based queues
 */
class MessageQueue extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(100); // Tăng giới hạn listeners
    this.queues = new Map(); // topic -> queue[]
    this.roundRobinCounters = new Map(); // specialization -> counter
    this.isConnected = true; // Simulate connection status
  }

  /**
   * Thay thế Kafka producer.sendMessage()
   * @param {string} topic - Topic name
   * @param {any} message - Message data
   */
  async sendMessage(topic, message) {
    try {
      // Thêm message vào queue
      this.enqueue(topic, message);
      
      // Emit event để trigger consumers
      this.emit(topic, message);
      
      console.log(`Message sent to topic ${topic}`);
      return true;
    } catch (err) {
      console.error(`Failed to send message to topic ${topic}`, err);
      throw err;
    }
  }

  /**
   * Thêm message vào queue
   * @param {string} topic - Topic name
   * @param {any} message - Message data
   */
  enqueue(topic, message) {
    if (!this.queues.has(topic)) {
      this.queues.set(topic, []);
    }
    this.queues.get(topic).push(message);
  }

  /**
   * Lấy message từ queue
   * @param {string} topic - Topic name
   * @returns {any|null} - Message hoặc null nếu queue rỗng
   */
  dequeue(topic) {
    const queue = this.queues.get(topic);
    return queue && queue.length > 0 ? queue.shift() : null;
  }

  /**
   * Lấy tất cả messages trong queue
   * @param {string} topic - Topic name
   * @returns {any[]} - Array of messages
   */
  getAllMessages(topic) {
    return this.queues.get(topic) || [];
  }

  /**
   * Xóa message khỏi queue
   * @param {string} topic - Topic name
   * @param {any} message - Message to remove
   */
  removeMessage(topic, message) {
    const queue = this.queues.get(topic);
    if (queue) {
      const index = queue.findIndex(msg => JSON.stringify(msg) === JSON.stringify(message));
      if (index !== -1) {
        queue.splice(index, 1);
      }
    }
  }

  /**
   * Round-robin counter cho specialization
   * @param {string} specialization - Specialization name
   * @param {number} maxCount - Maximum count for round-robin
   * @returns {number} - Next index
   */
  getRoundRobinIndex(specialization, maxCount) {
    const currentIndex = this.roundRobinCounters.get(specialization) || 0;
    const nextIndex = (currentIndex + 1) % maxCount;
    this.roundRobinCounters.set(specialization, nextIndex);
    return currentIndex;
  }

  /**
   * Simulate connection (thay thế connectProducer)
   */
  async connect() {
    this.isConnected = true;
    console.log("Message Queue connected");
  }

  /**
   * Simulate disconnection (thay thế disconnectProducer)
   */
  async disconnect() {
    this.isConnected = false;
    console.log("Message Queue disconnected");
  }

  /**
   * Get queue statistics
   * @returns {Object} - Queue statistics
   */
  getStats() {
    const stats = {};
    for (const [topic, queue] of this.queues) {
      stats[topic] = {
        length: queue.length,
        messages: queue.slice(0, 5) // First 5 messages for debugging
      };
    }
    return stats;
  }
}

// Singleton instance
const messageQueue = new MessageQueue();

export { messageQueue };
export default MessageQueue;
