"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateReceptionistByIdController = exports.getOneReceptionistByIdController = exports.getListReceptionistsController = exports.deleteReceptionistByIdController = exports.createReceptionistController = void 0;
var _receptionistServices = require("../services/receptionistServices.js");
// Receptionist, receptionist
const createReceptionistController = async (req, res) => {
  try {
    const newReceptionist = await (0, _receptionistServices.createReceptionistService)(req.body);
    res.status(201).json({
      success: true,
      message: "Receptionist created successfully",
      data: newReceptionist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.createReceptionistController = createReceptionistController;
const getListReceptionistsController = async (req, res) => {
  try {
    const {
      email
    } = req.query;
    if (email) {
      const receptionist = await (0, _receptionistServices.getReceptionistByEmail)(email);
      res.status(200).json(receptionist);
    } else {
      const receptionists = await (0, _receptionistServices.getListReceptionistsService)();
      res.status(200).json(receptionists);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.getListReceptionistsController = getListReceptionistsController;
const getOneReceptionistByIdController = async (req, res) => {
  try {
    const receptionist = await (0, _receptionistServices.getOneReceptionistByIdService)(req.params.id);
    res.status(200).json(receptionist);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.getOneReceptionistByIdController = getOneReceptionistByIdController;
const updateReceptionistByIdController = async (req, res) => {
  try {
    const updatedReceptionist = await (0, _receptionistServices.updateReceptionistByIdService)(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Receptionist updated successfully",
      data: updatedReceptionist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
exports.updateReceptionistByIdController = updateReceptionistByIdController;
const deleteReceptionistByIdController = async (req, res) => {
  try {
    await (0, _receptionistServices.deleteReceptionistByIdService)(req.params.id);
    res.status(200).json({
      success: true,
      message: "Receptionist deleted successfully"
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteReceptionistByIdController = deleteReceptionistByIdController;