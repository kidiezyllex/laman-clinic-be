"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _requestTestController = require("../controllers/requestTestController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _requestTestController.createRequestTestController);
router.get("/", _requestTestController.getListRequestTestsController);
router.get("/check", _requestTestController.checkRequestTestController);
router.get("/:id", _requestTestController.getOneRequestTestByIdController);
router.put("/:id", _requestTestController.updateRequestTestByIdController);
router.delete("/:id", _requestTestController.deleteRequestTestByIdController);
var _default = exports.default = router;