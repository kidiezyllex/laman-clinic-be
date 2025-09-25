"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReceptionistById = exports.getOneReceptionistById = exports.getListReceptionists = exports.findReceptionist = exports.deleteReceptionistById = exports.createReceptionist = void 0;
var _Receptionist = _interopRequireDefault(require("../models/Receptionist.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createReceptionist = async receptionistData => {
  const receptionist = new _Receptionist.default(receptionistData);
  return await receptionist.save();
};
exports.createReceptionist = createReceptionist;
const getListReceptionists = async () => {
  return await _Receptionist.default.find();
};
exports.getListReceptionists = getListReceptionists;
const findReceptionist = async query => {
  return await _Receptionist.default.findOne(query);
};
exports.findReceptionist = findReceptionist;
const getOneReceptionistById = async id => {
  return await _Receptionist.default.findById(id);
};
exports.getOneReceptionistById = getOneReceptionistById;
const updateReceptionistById = async (id, updateData) => {
  return await _Receptionist.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateReceptionistById = updateReceptionistById;
const deleteReceptionistById = async id => {
  return await _Receptionist.default.findByIdAndDelete(id);
};
exports.deleteReceptionistById = deleteReceptionistById;