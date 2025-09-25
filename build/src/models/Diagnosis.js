"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function generateUniqueId() {
  const randomString = Math.random().toString(36).substr(2, 6).toUpperCase(); // Tạo chuỗi ngẫu nhiên
  return `CD-${randomString}`;
}
const DiagnosisSchema = new _mongoose.default.Schema({
  diagnosisId: {
    type: String,
    auto: false
  },
  patientId: {
    type: String,
    ref: "Patient"
  },
  doctorId: {
    type: String,
    ref: "Doctor"
  },
  disease: {
    type: String,
    required: true
  },
  diagnosisDate: {
    type: Date,
    required: true
  },
  treatment: {
    type: String,
    required: true
  }
});
DiagnosisSchema.pre("save", async function (next) {
  if (this.isNew) {
    let uniqueId;
    let isUnique = false;
    while (!isUnique) {
      uniqueId = generateUniqueId();
      const existingDiagnosis = await _mongoose.default.models.Diagnosis.findOne({
        diagnosisId: uniqueId
      });
      isUnique = !existingDiagnosis;
    }
    this.diagnosisId = uniqueId;
  }
  next();
});
const Diagnosis = _mongoose.default.model("Diagnosis", DiagnosisSchema);
var _default = exports.default = Diagnosis;