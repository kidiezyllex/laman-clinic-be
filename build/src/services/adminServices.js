"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAdminByIdService = exports.getOneAdminByIdService = exports.getListAdminsService = exports.getCompletedAppointmentsByMonthService = exports.getAppointmentsBySpecializationService = exports.getAdminByEmail = exports.deleteAdminByIdService = exports.createAdminService = void 0;
var _adminRepository = require("../repositories/adminRepository.js");
const createAdminService = async adminData => {
  try {
    return await (0, _adminRepository.createAdmin)(adminData);
  } catch (error) {
    throw new Error("Error creating admin: " + error.message);
  }
};
exports.createAdminService = createAdminService;
const getAdminByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _adminRepository.findAdmin)(query);
};
exports.getAdminByEmail = getAdminByEmail;
const getListAdminsService = async () => {
  try {
    return await (0, _adminRepository.getListAdmins)();
  } catch (error) {
    throw new Error("Error fetching admin list: " + error.message);
  }
};
exports.getListAdminsService = getListAdminsService;
const getOneAdminByIdService = async id => {
  try {
    const admin = await (0, _adminRepository.getOneAdminById)(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  } catch (error) {
    throw new Error("Error fetching admin: " + error.message);
  }
};
exports.getOneAdminByIdService = getOneAdminByIdService;
const updateAdminByIdService = async (id, updateData) => {
  try {
    const updatedAdmin = await (0, _adminRepository.updateAdminById)(id, updateData);
    if (!updatedAdmin) {
      throw new Error("Admin not found");
    }
    return updatedAdmin;
  } catch (error) {
    throw new Error("Error updating admin: " + error.message);
  }
};
exports.updateAdminByIdService = updateAdminByIdService;
const deleteAdminByIdService = async id => {
  try {
    const deletedAdmin = await (0, _adminRepository.deleteAdminById)(id);
    if (!deletedAdmin) {
      throw new Error("Admin not found");
    }
    return deletedAdmin;
  } catch (error) {
    throw new Error("Error deleting admin: " + error.message);
  }
};
exports.deleteAdminByIdService = deleteAdminByIdService;
const getAppointmentsBySpecializationService = async () => {
  try {
    const result = await (0, _adminRepository.getAppointmentsBySpecialization)();
    if (!result) {
      throw new Error("Error");
    }
    return result;
  } catch (error) {
    console.error("Lỗi khi thống kê cuộc hẹn theo chuyên khoa:", error);
    throw error;
  }
};
exports.getAppointmentsBySpecializationService = getAppointmentsBySpecializationService;
const getCompletedAppointmentsByMonthService = async year => {
  try {
    const result = await (0, _adminRepository.getCompletedAppointmentsByMonth)(year);
    if (!result) {
      throw new Error("Error");
    }
    return result;
  } catch (error) {}
};
exports.getCompletedAppointmentsByMonthService = getCompletedAppointmentsByMonthService;