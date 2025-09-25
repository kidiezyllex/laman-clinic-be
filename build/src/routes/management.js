"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _Doctor = _interopRequireDefault(require("../models/Doctor"));
var _Pharmacist = _interopRequireDefault(require("../models/Pharmacist"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerManagement = _express.default.Router();

// management doctor
routerManagement.post("/", async (req, res) => {
  try {
    const doctor = new _Doctor.default(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});
//tạo 1 danh sách bác sĩ
routerManagement.post("/add-list", async (req, res) => {
  try {
    const doctorsData = req.body; // Lấy dữ liệu bác sĩ từ body

    // Kiểm tra xem dữ liệu có phải là một mảng hay không
    if (!Array.isArray(doctorsData)) {
      return res.status(400).json({
        message: "Data must be an array of doctors."
      });
    }

    // Thêm danh sách bác sĩ vào MongoDB
    const addedDoctors = await _Doctor.default.insertMany(doctorsData);
    return res.status(201).json({
      message: "Doctors added successfully",
      data: addedDoctors
    });
  } catch (error) {
    console.error("Error adding doctors:", error);
    return res.status(500).json({
      message: "Error adding doctors",
      error
    });
  }
});

// Lấy danh sách bác sĩ
routerManagement.get("/", async (req, res) => {
  try {
    const {
      specialization,
      email
    } = req.query;
    let query = {};
    if (specialization) {
      query.specialization = specialization;
    }
    if (email) {
      query.email = email;
    }
    const doctors = await _Doctor.default.find(query);
    if (doctors.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy bác sĩ nào với chuyên khoa này"
      });
    }
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    res.status(500).json({
      message: "Lỗi server nội bộ"
    });
  }
});

// Lấy danh sách các chuyên ngành khác nhau
routerManagement.get("/specializations", async (req, res) => {
  try {
    const specializations = await _Doctor.default.distinct("specialization");
    res.status(200).json(specializations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching specializations",
      error: error.message
    });
  }
});

// Lấy chi tiết một bác sĩ
routerManagement.get("/:id", async (req, res) => {
  try {
    const doctor = await _Doctor.default.findById(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});
routerManagement.get("/gets", async (req, res) => {
  try {
    const doctor = await _Doctor.default.findById(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin bác sĩ
routerManagement.patch("/:id", async (req, res) => {
  try {
    const doctor = await _Doctor.default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa bác sĩ
routerManagement.delete("/:id", async (req, res) => {
  try {
    const doctor = await _Doctor.default.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).send();
    res.status(200).send(doctor);
  } catch (error) {
    res.status(500).send(error);
  }
});

//management dược sĩ
///

routerManagement.post("/", async (req, res) => {
  try {
    const pharmacist = new _Pharmacist.default(req.body);
    await pharmacist.save();
    res.status(201).send(pharmacist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Lấy danh sách dược sĩ
routerManagement.get("/", async (req, res) => {
  try {
    let pharmacists;
    const {
      email
    } = req.query;
    if (!email) {
      pharmacists = await _Pharmacist.default.find();
    } else pharmacists = await _Pharmacist.default.findOne({
      email
    });
    res.status(200).send(pharmacists);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Lấy chi tiết một dược sĩ
routerManagement.get("/:id", async (req, res) => {
  try {
    const pharmacist = await _Pharmacist.default.findById(req.params.id);
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Cập nhật thông tin dược sĩ
routerManagement.patch("/:id", async (req, res) => {
  try {
    const pharmacist = await _Pharmacist.default.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Xóa dược sĩ
routerManagement.delete("/:id", async (req, res) => {
  try {
    const pharmacist = await _Pharmacist.default.findByIdAndDelete(req.params.id);
    if (!pharmacist) return res.status(404).send();
    res.status(200).send(pharmacist);
  } catch (error) {
    res.status(500).send(error);
  }
});

//management bệnh nhân
var _default = exports.default = routerManagement;