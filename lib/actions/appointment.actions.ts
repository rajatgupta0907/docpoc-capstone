"use server";
import appointment from "../models/appointment.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";

export async function createAppointment({
  doctor_id,
  patient_id,
  appointment_date,
  appointment_time,
}: {
  doctor_id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
}) {
  try {
    connectToDb();
    // find out if the same appointment exists
    const data = await appointment.findOne({
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
    });
    if (data) {
      throw new Error("Appointment already exists");
    }
    const appt = new appointment({
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
    });
    await appt.save();
  } catch (error: any) {
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
}
