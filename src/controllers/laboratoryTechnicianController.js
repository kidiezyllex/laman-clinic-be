import {
  createLaboratoryTechnicians,
  getListLaboratoryTechniciansService,
  getLaboratoryTechnicianById,
  updateLaboratoryTechnician,
  deleteLaboratoryTechnician,
  getLaboratoryTechnicianByEmail,
} from "../services/laboratoryTechnicianServices.js";

// Tạo một laboratory technician mới
export const createLaboratoryTechnicianController = async (req, res) => {
  try {
    const technician = await createLaboratoryTechnicians(req.body);
    res.status(201).json(technician);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy danh sách laboratory technicians
export const getListLaboratoryTechniciansController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const technicians = await getLaboratoryTechnicianByEmail(email);
      res.status(200).json(technicians);
    } else {
      const technicians = await getListLaboratoryTechniciansService();
      res.status(200).json(technicians);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết một laboratory technician
export const getLaboratoryTechnicianByIdController = async (req, res) => {
  try {
    const technician = await getLaboratoryTechnicianById(req.params.id);
    res.status(200).json(technician);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Cập nhật thông tin laboratory technician
export const updateLaboratoryTechnicianController = async (req, res) => {
  try {
    const technician = await updateLaboratoryTechnician(
      req.params.id,
      req.body
    );
    res.status(200).json(technician);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa laboratory technician
export const deleteLaboratoryTechnicianController = async (req, res) => {
  try {
    await deleteLaboratoryTechnician(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getListTest = async (req, res) => {
  try {
    const appointment = await getAppointmentToQueue(req.params.roomNumber);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
