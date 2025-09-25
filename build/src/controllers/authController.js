"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.logout = exports.loginUser = void 0;
var _Doctor = _interopRequireDefault(require("../models/Doctor.js"));
var _User = _interopRequireDefault(require("../models/User.js"));
var _Patient = _interopRequireDefault(require("../models/Patient.js"));
var _Pharmacist = _interopRequireDefault(require("../models/Pharmacist.js"));
var _Cashier = _interopRequireDefault(require("../models/Cashier.js"));
var _Receptionist = _interopRequireDefault(require("../models/Receptionist.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _redisClient = require("../redis/redisClient.js");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// controllers/authController.js

_dotenv.default.config();
// Tạo token JWT
const createToken = user => {
  return _jsonwebtoken.default.sign({
    id: user._id,
    role: user.role,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Đăng ký tài khoản
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      fullName,
      phone,
      gender
    } = req.body;

    // Kiểm tra nếu email bị thiếu hoặc không hợp lệ
    if (!email || email.trim() === "") {
      console.log("Email is missing or empty:", email); // Log kiểm tra
      return res.status(400).json({
        status: "fail",
        message: "Email is required and cannot be empty."
      });
    }

    // Kiểm tra xem email đã tồn tại trong bảng User hoặc Doctor chưa
    const existingUser = await _User.default.findOne({
      email
    });
    // const existingDoctor = await Doctor.findOne({ email });

    if (existingUser || existingDoctor) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists."
      });
    }

    // Nếu email chưa tồn tại, tiếp tục tạo tài khoản
    let user = await _User.default.create({
      email,
      password,
      role,
      fullName,
      phone,
      gender
    });
    if (role === "doctor") {
      const doctor = await _Doctor.default.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender
      });
      await doctor.save();
    } else if (role === "patient") {
      const patient = await _Patient.default.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender
      });
      await patient.save();
    } else if (role === "receptionist") {
      const receptionist = await _Receptionist.default.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender
      });
      await receptionist.save();
    } else if (role === "pharmacist") {
      const pharmacist = await _Pharmacist.default.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender
      });
      await pharmacist.save();
    } else if (role === "cashier") {
      const cashier = await _Cashier.default.create({
        email,
        password,
        role,
        fullName,
        phone,
        gender
      });
      await cashier.save();
    }

    // Tạo token JWT và trả về cho người dùng
    const token = createToken(user);
    res.status(201).json({
      status: "success",
      token,
      data: {
        id: user._id,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

// Đăng nhập
exports.register = register;
const loginUser = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    // Tìm kiếm người dùng theo email
    const user = await _User.default.findOne({
      email
    });

    // Nếu không tìm thấy người dùng hoặc mật khẩu không chính xác
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Email hoặc mật khẩu không chính xác"
      });
    }

    // Nếu người dùng là bác sĩ, đặt trạng thái isOnline = true và xử lý hàng đợi trong Redis
    if (user.role === "doctor") {
      const doctor = await _Doctor.default.findOne({
        email
      });
      doctor.isOnline = true;
      await doctor.save();
    }
    console.log(`${user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()} logged in`);

    // Không cần tạo JWT và lưu vào cookie ở đây nữa
    res.status(200).json({
      status: "success",
      message: "Đăng nhập thành công",
      data: {
        id: user._id,
        role: user.role,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};

// authController.js
exports.loginUser = loginUser;
const logout = async (req, res) => {
  try {
    // Xác định user từ request
    const user = req.user;

    // Nếu user không tồn tại, trả về lỗi
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Không thể tìm thấy người dùng để logout"
      });
    }

    // Nếu là bác sĩ, đặt lại isOnline = false
    if (user.role === "doctor") {
      user.isOnline = false;
      const queueKey = `queue:${user.roomNumber}`;
      await _redisClient.redisClient.del(queueKey); // Xóa queue khi bác sĩ offline
      user.roomNumber = "000";
      // Xóa queue của bác sĩ trong Redis
      await user.save();
    }

    // Xóa cookie chứa token JWT
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // Chỉ sử dụng cờ secure khi chạy trên production (HTTPS)
      sameSite: "Lax",
      // Cài đặt SameSite là 'Lax' để cookie được gửi với các yêu cầu điều hướng liên kết
      expires: new Date(Date.now() - 1)
    });
    res.status(200).json({
      status: "success",
      message: "Đăng xuất thành công"
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message
    });
  }
};
exports.logout = logout;