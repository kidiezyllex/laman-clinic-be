"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _winston = _interopRequireDefault(require("winston"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// utils/logger.js

const logger = _winston.default.createLogger({
  level: 'info',
  format: _winston.default.format.combine(_winston.default.format.timestamp(), _winston.default.format.printf(({
    timestamp,
    level,
    message,
    ...meta
  }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  })),
  transports: [new _winston.default.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }), new _winston.default.transports.File({
    filename: 'logs/combined.log'
  })]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston.default.transports.Console({
    format: _winston.default.format.combine(_winston.default.format.colorize(), _winston.default.format.simple())
  }));
}
var _default = exports.default = logger;