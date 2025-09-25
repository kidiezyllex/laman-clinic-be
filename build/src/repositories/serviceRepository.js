"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateService = exports.getServiceById = exports.getAllServices = exports.deleteService = exports.createService = void 0;
var _Services = _interopRequireDefault(require("../models/Services.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Tạo dịch vụ mới
const createService = async data => {
  const service = new _Services.default(data);
  return await service.save();
};

// Lấy tất cả dịch vụ
exports.createService = createService;
const getAllServices = async () => {
  return await _Services.default.find();
};

// Lấy dịch vụ theo ID
exports.getAllServices = getAllServices;
const getServiceById = async id => {
  return await _Services.default.findById(id);
};

// Cập nhật dịch vụ
exports.getServiceById = getServiceById;
const updateService = async (id, data) => {
  return await _Services.default.findByIdAndUpdate(id, data, {
    new: true
  });
};

// Xóa dịch vụ
exports.updateService = updateService;
const deleteService = async id => {
  return await _Services.default.findByIdAndDelete(id);
};
exports.deleteService = deleteService;