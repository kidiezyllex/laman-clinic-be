"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLabTest = exports.listLabTests = exports.getLabTestById = exports.deleteLabTest = exports.createLabTests = void 0;
var _labTestRepository = require("../repositories/labTestRepository.js");
const createLabTests = async labTestData => {
  return await (0, _labTestRepository.createLabTest)(labTestData);
};
exports.createLabTests = createLabTests;
const listLabTests = async () => {
  return await (0, _labTestRepository.getListLabTests)();
};
exports.listLabTests = listLabTests;
const getLabTestById = async id => {
  const labTest = await (0, _labTestRepository.getOneLabTestById)(id);
  if (!labTest) throw new Error("Lab Test not found");
  return labTest;
};
exports.getLabTestById = getLabTestById;
const updateLabTest = async (id, updateData) => {
  const labTest = await (0, _labTestRepository.updateLabTestById)(id, updateData);
  if (!labTest) throw new Error("Lab Test not found");
  return labTest;
};
exports.updateLabTest = updateLabTest;
const deleteLabTest = async id => {
  const labTest = await (0, _labTestRepository.deleteLabTestById)(id);
  if (!labTest) throw new Error("Lab Test not found");
  return labTest;
};
exports.deleteLabTest = deleteLabTest;