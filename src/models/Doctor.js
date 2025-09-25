import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import scheduleSchema from "../models/Schedule.js"; // Đảm bảo đường dẫn là chính xác

const appointmentSchema = new mongoose.Schema({
  _id: { type: String, aotu: false },
  patientId: { type: String, ref: "Patient", required: true },
  appointmentDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Completed",
  },
});

function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `BS-${randomString}`;
}

const doctorSchema = new mongoose.Schema(
  {
    _id: { type: String, auto: false },
    fullName: { type: String },
    specialization: { type: String },
    department: { type: String, ref: "Department" },
    dateOfBirth: { type: Date },
    numberId: { type: String },
    role: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, "Please use a valid phone number."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: [scheduleSchema], // Sử dụng đúng cách schema cho lịch trình
    isOnline: { type: Boolean, default: false },
    roomNumber: { type: String, default: "000" },
    appointmentList: [appointmentSchema], // danh sách các cuộc hẹn mà bác sĩ đã làm trong ngày
    isDepartmentHead: { type: Boolean, default: false },
    address: { type: String },
  },
  { timestamps: true }
);

doctorSchema.index({ email: 1 }, { unique: true });

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

doctorSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;

    // Kiểm tra tính duy nhất của ID
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDoctor = await mongoose.models.Doctor.findOne({
        _id: uniqueId,
      });
      isUnique = !existingDoctor; // Kiểm tra xem ID có tồn tại không
    }

    this._id = uniqueId; // Gán ID duy nhất
  }
  next();
});

// Phương thức để so sánh mật khẩu
doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
