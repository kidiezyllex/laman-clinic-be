"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLaboratoryTechnician = exports.getRequestTestFromQueue = exports.getListLaboratoryTechniciansService = exports.getLaboratoryTechnicianById = exports.getLaboratoryTechnicianByEmail = exports.deleteLaboratoryTechnician = exports.createLaboratoryTechnicians = void 0;
var _redisClient = require("../redis/redisClient.js");
var _laboratoryTechnicianRepository = require("../repositories/laboratoryTechnicianRepository.js");
var _queueRepository = require("../repositories/queueRepository.js");
const createLaboratoryTechnicians = async technicianData => {
  return await (0, _laboratoryTechnicianRepository.createLaboratoryTechnician)(technicianData);
};
exports.createLaboratoryTechnicians = createLaboratoryTechnicians;
const getLaboratoryTechnicianByEmail = async email => {
  let query = {};
  if (email) {
    query.email = email;
  }
  return await (0, _laboratoryTechnicianRepository.findLaboratoryTechnician)(query);
};
exports.getLaboratoryTechnicianByEmail = getLaboratoryTechnicianByEmail;
const getListLaboratoryTechniciansService = async () => {
  return await (0, _laboratoryTechnicianRepository.getListLaboratoryTechnicians)();
};
exports.getListLaboratoryTechniciansService = getListLaboratoryTechniciansService;
const getLaboratoryTechnicianById = async id => {
  const technician = await (0, _laboratoryTechnicianRepository.getOneLaboratoryTechnicianById)(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.getLaboratoryTechnicianById = getLaboratoryTechnicianById;
const updateLaboratoryTechnician = async (id, updateData) => {
  const technician = await (0, _laboratoryTechnicianRepository.updateLaboratoryTechnicianById)(id, updateData);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.updateLaboratoryTechnician = updateLaboratoryTechnician;
const deleteLaboratoryTechnician = async id => {
  const technician = await (0, _laboratoryTechnicianRepository.deleteLaboratoryTechnicianById)(id);
  if (!technician) throw new Error("Laboratory Technician not found");
  return technician;
};
exports.deleteLaboratoryTechnician = deleteLaboratoryTechnician;
const getRequestTestFromQueue = async specialization => {
  const queueKey = `queue:LabTest-${specialization}`;
  const requestTestsData = await (0, _queueRepository.getAppointmentsFromQueueRepo)(queueKey);
  const parsedData = requestTestsData.map(data => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(`Invalid JSON data: ${data}`);
      return null;
    }
  }).filter(data => data !== null);
  return parsedData;
};
exports.getRequestTestFromQueue = getRequestTestFromQueue;