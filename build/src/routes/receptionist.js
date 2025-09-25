"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _receptionistController = require("../controllers/receptionistController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", _receptionistController.createReceptionistController);
router.get("/", _receptionistController.getListReceptionistsController);
router.get("/:id", _receptionistController.getOneReceptionistByIdController);
router.put("/:id", _receptionistController.updateReceptionistByIdController);
router.delete("/:id", _receptionistController.deleteReceptionistByIdController);
var _default = exports.default = router;