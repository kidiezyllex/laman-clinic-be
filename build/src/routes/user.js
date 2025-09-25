"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _User = _interopRequireDefault(require("../models/User.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/", async (req, res) => {
  const {
    fullName,
    gender,
    phone,
    email,
    password,
    role
  } = req.body;
  const user = new _User.default({
    fullName,
    gender,
    phone,
    email,
    password,
    role
  });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await _User.default.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Read a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await _User.default.findById(req.params.id);
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const user = await _User.default.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const user = await _User.default.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({
      message: "User not found"
    });
    res.json({
      message: "User deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
var _default = exports.default = router;