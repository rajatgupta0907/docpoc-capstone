import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
});

const appointment =
  mongoose.models.appointments ||
  mongoose.model("appointments", appointmentSchema);
export default appointment;
