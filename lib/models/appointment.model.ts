import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
});

const doctor = mongoose.models.doctor || mongoose.model("appointment", userSchema);
export default doctor;
