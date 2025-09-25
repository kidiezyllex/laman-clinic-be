"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserById = exports.updateFcmToken = exports.getOneUserById = exports.getListUsers = exports.findByRole = exports.deleteUserById = exports.createUser = void 0;
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createUser = async userData => {
  const user = new _User.default(userData);
  return await user.save();
};
exports.createUser = createUser;
const getListUsers = async () => {
  return await _User.default.find();
};
exports.getListUsers = getListUsers;
const getOneUserById = async id => {
  return await _User.default.findById(id);
};
exports.getOneUserById = getOneUserById;
const updateUserById = async (id, updateData) => {
  return await _User.default.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
};
exports.updateUserById = updateUserById;
const deleteUserById = async id => {
  return await _User.default.findByIdAndDelete(id);
};
exports.deleteUserById = deleteUserById;
const findByRole = role => {
  return _User.default.find({
    role
  });
};
exports.findByRole = findByRole;
const updateFcmToken = (userId, fcmToken) => {
  return _User.default.findByIdAndUpdate(userId, {
    fcmToken
  }, {
    new: true
  });
};
exports.updateFcmToken = updateFcmToken;