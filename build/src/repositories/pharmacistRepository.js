"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePharmacistById = exports.getOnePharmacistById = exports.getListPharmacists = exports.findPharmacist = exports.deletePharmacistById = exports.createPharmacist = void 0;
var _Pharmacist = _interopRequireDefault(require("../models/Pharmacist.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createPharmacist = async pharmacistData => {
  const pharmacist = new _Pharmacist.default(pharmacistData);
  return await pharmacist.save();
};
exports.createPharmacist = createPharmacist;
const getListPharmacists = async () => {
  return await _Pharmacist.default.find();
};
exports.getListPharmacists = getListPharmacists;
const findPharmacist = async query => {
  return await _Pharmacist.default.findOne(query);
};
exports.findPharmacist = findPharmacist;
const getOnePharmacistById = async id => {
  return await _Pharmacist.default.findById(id);
};
exports.getOnePharmacistById = getOnePharmacistById;
const updatePharmacistById = async (id, updateData) => {
  return await _Pharmacist.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updatePharmacistById = updatePharmacistById;
const deletePharmacistById = async id => {
  return await _Pharmacist.default.findByIdAndDelete(id);
};
exports.deletePharmacistById = deletePharmacistById;