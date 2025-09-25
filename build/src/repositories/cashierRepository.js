"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCashierById = exports.getOneCashierById = exports.getListCashiers = exports.findCashier = exports.deleteCashierById = exports.createCashier = void 0;
var _Cashier = _interopRequireDefault(require("../models/Cashier.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createCashier = async cashierData => {
  const cashier = new _Cashier.default(cashierData);
  return await cashier.save();
};
exports.createCashier = createCashier;
const getListCashiers = async () => {
  return await _Cashier.default.find();
};
exports.getListCashiers = getListCashiers;
const findCashier = async query => {
  return await _Cashier.default.findOne(query);
};
exports.findCashier = findCashier;
const getOneCashierById = async id => {
  return await _Cashier.default.findById(id);
};
exports.getOneCashierById = getOneCashierById;
const updateCashierById = async (id, updateData) => {
  return await _Cashier.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateCashierById = updateCashierById;
const deleteCashierById = async id => {
  return await _Cashier.default.findByIdAndDelete(id);
};
exports.deleteCashierById = deleteCashierById;