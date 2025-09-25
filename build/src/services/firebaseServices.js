"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotificationToRole = void 0;
var _firebase = _interopRequireDefault(require("../util/firebase.js"));
var _userRepository = require("../repositories/userRepository.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sendNotificationToRole = async (role, title, body) => {
  const users = await (0, _userRepository.findByRole)(role);
  const tokens = users.map(user => user.fcmToken).filter(token => token);
  if (tokens.length > 0) {
    const message = {
      notification: {
        title,
        body
      },
      tokens: tokens
    };
    try {
      await _firebase.default.messaging().sendMulticast(message);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};
exports.sendNotificationToRole = sendNotificationToRole;