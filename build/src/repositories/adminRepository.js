"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAdminById = exports.getRevisitedPatientsRate = exports.getRevisitedPatients = exports.getOneAdminById = exports.getListAdmins = exports.getCompletedAppointmentsByMonth = exports.getAppointmentsBySpecialization = exports.findAdmin = exports.deleteAdminById = exports.createAdmin = void 0;
var _Admin = _interopRequireDefault(require("../models/Admin.js"));
var _Appointment = _interopRequireDefault(require("../models/Appointment.js"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createAdmin = async adminData => {
  const admin = new _Admin.default(adminData);
  return await admin.save();
};
exports.createAdmin = createAdmin;
const getListAdmins = async () => {
  return await _Admin.default.find();
};
exports.getListAdmins = getListAdmins;
const findAdmin = async query => {
  return await _Admin.default.findOne(query);
};
exports.findAdmin = findAdmin;
const getOneAdminById = async id => {
  return await _Admin.default.findById(id);
};
exports.getOneAdminById = getOneAdminById;
const updateAdminById = async (id, updateData) => {
  return await _Admin.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateAdminById = updateAdminById;
const deleteAdminById = async id => {
  return await _Admin.default.findByIdAndDelete(id);
};

//Thống kế các cuộc hẹn đã hoàn thành trong theo từng tháng
exports.deleteAdminById = deleteAdminById;
const getCompletedAppointmentsByMonth = async year => {
  return await _Appointment.default.aggregate([{
    $match: {
      appointmentDate: {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${year + 1}-01-01`) // Kết thúc của năm được chỉ định
      }
    }
  }, {
    $group: {
      _id: {
        month: {
          $month: "$appointmentDate"
        },
        year: {
          $year: "$appointmentDate"
        }
      },
      count: {
        $sum: 1
      }
    }
  }, {
    $project: {
      _id: 0,
      // Loại bỏ trường _id
      month: "$_id.month",
      year: "$_id.year",
      count: 1
    }
  }, {
    $sort: {
      year: 1,
      month: 1
    } // Sắp xếp theo năm và tháng
  }]);
};
exports.getCompletedAppointmentsByMonth = getCompletedAppointmentsByMonth;
const getAppointmentsBySpecialization = async () => {
  return await _Appointment.default.aggregate([{
    $group: {
      _id: "$specialization",
      count: {
        $sum: 1
      }
    }
  }, {
    $project: {
      _id: 0,
      specialization: "$_id",
      count: 1
    }
  }, {
    $sort: {
      count: -1
    }
  }]);
};
exports.getAppointmentsBySpecialization = getAppointmentsBySpecialization;
const getRevisitedPatients = async () => {
  return await _Appointment.default.aggregate([{
    $group: {
      _id: "$patientId",
      totalAppointments: {
        $sum: 1
      }
    }
  }, {
    $match: {
      totalAppointments: {
        $gt: 1
      }
    }
  }, {
    $count: "revisitedPatients"
  }]);
};

// Tỉ lệ bệnh nhân quay lại khám tại phòng khám
exports.getRevisitedPatients = getRevisitedPatients;
const getRevisitedPatientsRate = async () => {
  return await _Appointment.default.aggregate([{
    $group: {
      _id: "$patientId",
      totalAppointments: {
        $sum: 1
      }
    }
  }, {
    $facet: {
      totalPatients: [{
        $count: "totalPatients"
      }],
      revisitPatients: [{
        $match: {
          totalAppointments: {
            $gt: 1
          }
        }
      }, {
        $count: "revisitPatients"
      }]
    }
  }, {
    $project: {
      totalPatients: {
        $arrayElemAt: ["$totalPatients.totalPatients", 0]
      },
      revisitPatients: {
        $arrayElemAt: ["$revisitPatients.revisitPatients", 0]
      }
    }
  }, {
    $addFields: {
      revisitRate: {
        $multiply: [{
          $divide: ["$revisitPatients", "$totalPatients"]
        }, 100]
      }
    }
  }]);
};
exports.getRevisitedPatientsRate = getRevisitedPatientsRate;