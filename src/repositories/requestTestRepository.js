import RequestTest from "../models/RequestTest.js";

export const createRequestTest = async (requestTestData) => {
  const requestTest = new RequestTest(requestTestData);
  return await requestTest.save();
};

export const getListRequestTests = async () => {
  return await RequestTest.find()
    .populate("patientId")
    .populate("doctorId");
};

export const getOneRequestTestById = async (id) => {
  return await RequestTest.findById(id)
    .populate("patientId")
    .populate("doctorId");
};

export const updateRequestTestById = async (id, updateData) => {
  return await RequestTest.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteRequestTestById = async (id) => {
  return await RequestTest.findByIdAndDelete(id);
};

export const filterRequestTests = async (patientId, doctorId) => {
  const filter = {};
  if (patientId) filter.patientId = patientId;
  if (doctorId) filter.doctorId = doctorId;
  return await RequestTest.find(filter);
};

export const getAppointmentIdsByDoctorId = async (doctorId) => {
  const requests = await RequestTest.find({ doctorId }).distinct(
    "appointmentId"
  );
  return requests;
};
