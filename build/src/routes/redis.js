"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _priorityQueue = require("../utils/priorityQueue.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Thay thế Redis bằng in-memory queue

const router = _express.default.Router();
router.get('/:roomNumber', async (req, res) => {
  const {
    roomNumber
  } = req.params;
  try {
    const patientsData = await _priorityQueue.priorityQueue.getAllPatientsFromQueue(roomNumber);
    if (!patientsData.length) {
      return res.status(404).json({
        success: false,
        message: 'No patients in queue'
      });
    }
    res.status(200).json({
      success: true,
      data: patientsData
    });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});
router.delete('/:roomNumber/:patientId', async (req, res) => {
  const {
    roomNumber,
    patientId
  } = req.params;
  try {
    const removed = await _priorityQueue.priorityQueue.removePatientFromQueue(roomNumber, patientId);
    if (!removed) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Patient removed successfully'
    });
  } catch (err) {
    console.error('Error removing patient from queue:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});

// API để lấy bệnh nhân tiếp theo từ queue
router.get('/get-one/:roomNumber', async (req, res) => {
  const {
    roomNumber
  } = req.params;
  try {
    const patientData = await _priorityQueue.priorityQueue.getNextPatientFromQueue(roomNumber);
    if (patientData) {
      res.status(200).json({
        success: true,
        data: patientData
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No patients in queue'
      });
    }
  } catch (err) {
    console.error('Error retrieving patient from queue:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
});
var _default = exports.default = router;