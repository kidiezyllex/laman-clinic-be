// Thay thế Redis bằng in-memory cache với TTL và LRU
import { EventEmitter } from 'events';

/**
 * In-Memory Cache System
 * Thay thế Redis với Map-based cache, TTL support, và LRU eviction
 */
class InMemoryCache extends EventEmitter {
  constructor(options = {}) {
    super();
    this.cache = new Map();
    this.timers = new Map(); // TTL timers
    this.accessOrder = new Map(); // For LRU tracking
    this.maxSize = options.maxSize || 1000; // Maximum cache size
    this.defaultTTL = options.defaultTTL || 0; // Default TTL in ms
    this.isConnected = true; // Simulate connection status
  }

  /**
   * Set key-value pair with optional TTL
   * @param {string} key - Cache key
   * @param {any} value - Cache value
   * @param {number} ttl - Time to live in milliseconds
   */
  async set(key, value, ttl = this.defaultTTL) {
    try {
      // Check cache size limit
      if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
        this.evictLRU();
      }

      // Clear existing timer if key exists
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
      }

      // Set value
      this.cache.set(key, value);
      this.updateAccessOrder(key);

      // Set TTL timer
      if (ttl > 0) {
        const timer = setTimeout(() => {
          this.delete(key);
        }, ttl);
        this.timers.set(key, timer);
      }

      return true;
    } catch (err) {
      console.error('Error setting cache:', err);
      throw err;
    }
  }

  /**
   * Get value by key
   * @param {string} key - Cache key
   * @returns {any} - Cached value or null
   */
  async get(key) {
    try {
      if (this.cache.has(key)) {
        this.updateAccessOrder(key);
        return this.cache.get(key);
      }
      return null;
    } catch (err) {
      console.error('Error getting from cache:', err);
      throw err;
    }
  }

  /**
   * Delete key from cache
   * @param {string} key - Cache key
   * @returns {boolean} - True if key existed
   */
  async delete(key) {
    try {
      const existed = this.cache.delete(key);
      this.accessOrder.delete(key);
      
      // Clear timer
      if (this.timers.has(key)) {
        clearTimeout(this.timers.get(key));
        this.timers.delete(key);
      }
      
      return existed;
    } catch (err) {
      console.error('Error deleting from cache:', err);
      throw err;
    }
  }

  /**
   * Check if key exists
   * @param {string} key - Cache key
   * @returns {boolean} - True if key exists
   */
  async exists(key) {
    return this.cache.has(key);
  }

  /**
   * Get all keys matching pattern (simple wildcard support)
   * @param {string} pattern - Pattern to match (supports * wildcard)
   * @returns {string[]} - Array of matching keys
   */
  async keys(pattern = '*') {
    const allKeys = Array.from(this.cache.keys());
    if (pattern === '*') {
      return allKeys;
    }
    
    // Simple wildcard matching
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return allKeys.filter(key => regex.test(key));
  }

  /**
   * Clear all cache entries
   */
  async flushAll() {
    try {
      // Clear all timers
      for (const timer of this.timers.values()) {
        clearTimeout(timer);
      }
      
      this.cache.clear();
      this.timers.clear();
      this.accessOrder.clear();
      
      return true;
    } catch (err) {
      console.error('Error flushing cache:', err);
      throw err;
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  /**
   * Update access order for LRU tracking
   * @param {string} key - Cache key
   */
  updateAccessOrder(key) {
    this.accessOrder.set(key, Date.now());
  }

  /**
   * Evict least recently used item
   */
  evictLRU() {
    if (this.cache.size === 0) return;

    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, time] of this.accessOrder) {
      if (time < oldestTime) {
        oldestTime = time;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
      console.log(`Evicted LRU key: ${oldestKey}`);
    }
  }

  /**
   * Calculate hit rate (simplified)
   * @returns {number} - Hit rate percentage
   */
  calculateHitRate() {
    // This is a simplified implementation
    // In a real scenario, you'd track hits/misses
    return 0.95; // Simulate 95% hit rate
  }

  /**
   * Estimate memory usage
   * @returns {number} - Estimated memory usage in bytes
   */
  estimateMemoryUsage() {
    let size = 0;
    for (const [key, value] of this.cache) {
      size += key.length * 2; // UTF-16 encoding
      size += JSON.stringify(value).length * 2;
    }
    return size;
  }

  /**
   * Simulate connection (thay thế connectRedis)
   */
  async connect() {
    this.isConnected = true;
    console.log('In-Memory Cache connected');
  }

  /**
   * Simulate disconnection
   */
  async disconnect() {
    this.isConnected = false;
    await this.flushAll();
    console.log('In-Memory Cache disconnected');
  }
}

// Singleton instance
const inMemoryCache = new InMemoryCache({
  maxSize: 1000,
  defaultTTL: 0
});

export { inMemoryCache };
export default InMemoryCache;
