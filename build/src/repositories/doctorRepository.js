"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDoctorOnlineStatus = exports.updateDoctorByIdRepo = exports.getSpecializations = exports.getOneDoctorById = exports.getListDoctors = exports.getAppointmentsByDateRepository = exports.findDoctors = exports.findDoctor = exports.deleteDoctorById = exports.createDoctor = void 0;
var _Doctor = _interopRequireDefault(require("../models/Doctor.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createDoctor = async doctorData => {
  const doctor = new _Doctor.default(doctorData);
  return await doctor.save();
};
exports.createDoctor = createDoctor;
const getListDoctors = async () => {
  return await _Doctor.default.find();
};
exports.getListDoctors = getListDoctors;
const findDoctors = async query => {
  return await _Doctor.default.find(query);
};
exports.findDoctors = findDoctors;
const findDoctor = async query => {
  return await _Doctor.default.findOne(query);
};
exports.findDoctor = findDoctor;
const getOneDoctorById = async id => {
  return await _Doctor.default.findById(id);
};
exports.getOneDoctorById = getOneDoctorById;
const updateDoctorByIdRepo = async (id, updateData) => {
  return await _Doctor.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateDoctorByIdRepo = updateDoctorByIdRepo;
const updateDoctorOnlineStatus = async (doctorId, isOnline, roomNumber) => {
  return await _Doctor.default.findByIdAndUpdate(doctorId, {
    isOnline,
    roomNumber
  }, {
    new: true,
    runValidators: true
  });
};
exports.updateDoctorOnlineStatus = updateDoctorOnlineStatus;
const deleteDoctorById = async id => {
  return await _Doctor.default.findByIdAndDelete(id);
};
exports.deleteDoctorById = deleteDoctorById;
const getSpecializations = async () => {
  return await _Doctor.default.distinct("specialization");
};
exports.getSpecializations = getSpecializations;
const getAppointmentsByDateRepository = async (doctorId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  try {
    const appointments = await _Doctor.default.aggregate([{
      $match: {
        _id: doctorId
      }
    }, {
      $unwind: "$appointmentList"
    }, {
      $match: {
        "appointmentList.appointmentDate": {
          $gte: startOfDay,
          $lte: endOfDay
        }
      }
    }, {
      $project: {
        appointmentList: 1,
        _id: 0
      }
    }]);
    return appointments.map(item => item.appointmentList);
  } catch (error) {
    throw error; // Ném lỗi lên service để xử lý
  }
};
exports.getAppointmentsByDateRepository = getAppointmentsByDateRepository;