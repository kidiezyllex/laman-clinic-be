"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _testTypeController = require("../controllers/testTypeController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _testTypeController.createTestTypeController);
router.get("/", _testTypeController.getListTestTypesController);
router.get("/:id", _testTypeController.getOneTestTypeByIdController);
router.put("/:id", _testTypeController.updateTestTypeByIdController);
router.delete("/:id", _testTypeController.deleteTestTypeByIdController);
var _default = exports.default = router;