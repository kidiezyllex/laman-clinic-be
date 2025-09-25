"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _patient = _interopRequireDefault(require("./routes/patient.js"));
var _doctor = _interopRequireDefault(require("./routes/doctor.js"));
var _pharmacist = _interopRequireDefault(require("./routes/pharmacist.js"));
var _receptionist = _interopRequireDefault(require("./routes/receptionist.js"));
var _appointment = _interopRequireDefault(require("./routes/appointment.js"));
var _appointmentByPatient = _interopRequireDefault(require("./routes/appointmentByPatient.js"));
var _prescription = _interopRequireDefault(require("./routes/prescription.js"));
var _clinic = _interopRequireDefault(require("./routes/clinic.js"));
var _diagnosis = _interopRequireDefault(require("./routes/diagnosis.js"));
var _invoice = _interopRequireDefault(require("./routes/invoice.js"));
var _requestTest = _interopRequireDefault(require("./routes/requestTest.js"));
var _test = _interopRequireDefault(require("./routes/test.js"));
var _department = _interopRequireDefault(require("./routes/department.js"));
var _admin = _interopRequireDefault(require("./routes/admin.js"));
var _testType = _interopRequireDefault(require("./routes/testType.js"));
var _medication = _interopRequireDefault(require("./routes/medication.js"));
var _laboratoryTechnician = _interopRequireDefault(require("./routes/laboratoryTechnician.js"));
var _messageQueue = require("./utils/messageQueue.js");
var _inMemoryCache = require("./utils/inMemoryCache.js");
var _departmentProcessor = require("./utils/departmentProcessor.js");
var _pharmacistProcessor = require("./utils/pharmacistProcessor.js");
var _labTestProcessor = require("./utils/labTestProcessor.js");
var _redis = _interopRequireDefault(require("./routes/redis.js"));
var _auth = _interopRequireDefault(require("./routes/auth.js"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _user = _interopRequireDefault(require("./routes/user.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Thay thế Kafka và Redis bằng in-memory systems

const app = (0, _express.default)();
const port = process.env.PORT || 3000;

// Kết nối đến MongoDB
_mongoose.default.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected successfully")).catch(err => console.log("MongoDB connection error:", err));
const corsOptions = {
  // Allow requests from your client
  origin: ["http://localhost:3001", "http://localhost:8888", "https://lamanclinic.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // Allowed HTTP methods
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
};

// Middleware
app.use(_bodyParser.default.json());
app.use((0, _cors.default)(corsOptions));
app.use((0, _cookieParser.default)());
app.use("/api/patients", _patient.default);
app.use("/api/doctors", _doctor.default);
app.use("/api/pharmacists", _pharmacist.default);
app.use("/api/receptionists", _receptionist.default);
app.use("/api/appointments", _appointment.default);
app.use("/api/appointmentsByPatient", _appointmentByPatient.default);
app.use("/api/prescriptions", _prescription.default);
app.use("/api/invoices", _invoice.default);
app.use("/api/request-tests", _requestTest.default);
app.use("/api/tests", _test.default);
app.use("/api/queue", _redis.default);
app.use("/api/auth", _auth.default);
app.use("/api/users", _user.default);
app.use("/api/admins", _admin.default);
app.use("/api/test-types", _testType.default);
app.use("/api/medications", _medication.default);
app.use("/api/clinics", _clinic.default);
app.use("/api/diagnoses", _diagnosis.default);
app.use("/api/departments", _department.default);
app.use("/api/laboratory-technicians", _laboratoryTechnician.default);
// app.use("/api/labTests", labTestRoutes);
// Hàm khởi động ứng dụng

app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  startApp();
});
const startApp = async () => {
  // Thay thế Redis và Kafka connections bằng in-memory systems
  await _inMemoryCache.inMemoryCache.connect();
  await _messageQueue.messageQueue.connect();

  // Khởi động các processors thay thế cho Kafka consumers
  await _departmentProcessor.departmentProcessor.start();
  await _pharmacistProcessor.pharmacistProcessor.start();
  await _labTestProcessor.labTestProcessor.start();
  console.log("All in-memory systems started successfully");
};