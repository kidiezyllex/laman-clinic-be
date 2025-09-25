"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _testController = require("../controllers/testController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const routerTest = _express.default.Router();
routerTest.post("/", _testController.createTestController);

// Không truyền query thì get all
// Truyền query (patientId & doctorId) thì get one
routerTest.get("/", _testController.getListTestsController);
routerTest.get("/check", _testController.checkTestController);
routerTest.get("/:id", _testController.getOneTestByIdController);
routerTest.put("/:id", _testController.updateTestByIdController);
routerTest.delete("/:id", _testController.deleteTestByIdController);
var _default = exports.default = routerTest;