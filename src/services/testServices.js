import {
  createTestRepo,
  getListTestsRepo,
  getOneTestByIdRepo,
  updateTestByIdRepo,
  deleteTestByIdRepo,
  getPatientIdsByDoctorIdRepo,
  getMostRecentTestRepo,
  findTestByAppointmentId,
} from "../repositories/testRepository.js";

export const createTestService = async (testData) => {
  try {
    return await createTestRepo(testData);
  } catch (error) {
    throw new Error("Error creating test: " + error.message);
  }
};

export const getListTestsService = async () => {
  try {
    return await getListTestsRepo();
  } catch (error) {
    throw new Error("Error fetching test list: " + error.message);
  }
};

export const getOneTestByIdService = async (id) => {
  try {
    const test = await getOneTestByIdRepo(id);
    if (!test) {
      throw new Error("Test not found");
    }
    return test;
  } catch (error) {
    throw new Error("Error fetching test: " + error.message);
  }
};

export const updateTestByIdService = async (id, updateData) => {
  try {
    const updatedTest = await updateTestByIdRepo(id, updateData);
    if (!updatedTest) {
      throw new Error("Test not found");
    }
    return updatedTest;
  } catch (error) {
    throw new Error("Error updating test: " + error.message);
  }
};

export const deleteTestByIdService = async (id) => {
  try {
    const deletedTest = await deleteTestByIdRepo(id);
    if (!deletedTest) {
      throw new Error("Test not found");
    }
    return deletedTest;
  } catch (error) {
    throw new Error("Error deleting test: " + error.message);
  }
};

export const getPatientIdsForDoctor = async (doctorId) => {
  return await getPatientIdsByDoctorIdRepo(doctorId);
};

export const getMostRecentTest = async (patientId, doctorId) => {
  const test = await getMostRecentTestRepo(patientId, doctorId);
  return test || null;
};

export const getOneTestByAppointmentIdService = async (appointmentId) => {
  let query = {};
  if (appointmentId) {
    query.appointmentId = appointmentId;
  }
  return await findTestByAppointmentId(query);
};
