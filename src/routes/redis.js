import express from 'express';
import { priorityQueue } from '../utils/priorityQueue.js'; // Thay thế Redis bằng in-memory queue

const router = express.Router();


router.get('/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const patientsData = await priorityQueue.getAllPatientsFromQueue(roomNumber);

    if (!patientsData.length) {
      return res.status(404).json({ success: false, message: 'No patients in queue' });
    }

    res.status(200).json({ success: true, data: patientsData });
  } catch (err) {
    console.error('Error retrieving patients from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.delete('/:roomNumber/:patientId', async (req, res) => {
  const { roomNumber, patientId } = req.params;

  try {
    const removed = await priorityQueue.removePatientFromQueue(roomNumber, patientId);

    if (!removed) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.status(200).json({ success: true, message: 'Patient removed successfully' });
  } catch (err) {
    console.error('Error removing patient from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// API để lấy bệnh nhân tiếp theo từ queue
router.get('/get-one/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;

  try {
    const patientData = await priorityQueue.getNextPatientFromQueue(roomNumber);

    if (patientData) {
      res.status(200).json({ success: true, data: patientData });
    } else {
      res.status(404).json({ success: false, message: 'No patients in queue' });
    }
  } catch (err) {
    console.error('Error retrieving patient from queue:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

export default router;
