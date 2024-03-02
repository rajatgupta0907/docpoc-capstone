"use server";
import appointment from "../models/appointment.model";
import { connectToDb } from "../mongoose";
import { revalidatePath } from "next/cache";
import EmailUtil, { EmailOptions } from "../nodemailer";
import { clerkClient } from "@clerk/nextjs/server";
async function getUserEmail(userId: string): Promise<string> {
  const user = await clerkClient.users.getUser(userId);
  return user.emailAddresses[0].emailAddress;
}
async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const emailUtil = new EmailUtil();
  const emailOptions: EmailOptions = {
    to,
    subject,
    text,
  };
  return emailUtil.sendEmail(emailOptions);
}
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
    revalidatePath("/appointments");
    const emailOfDoctor = await getUserEmail(doctor_id);
    const emailOfPatient = await getUserEmail(patient_id);
    console.log(emailOfDoctor, emailOfPatient);
    //
    await sendEmail({
      to: emailOfDoctor,
      subject: "New Appointment",
      text: `You have a new appointment at ${appointment_date} ${appointment_time}`,
    });
    await sendEmail({
      to: emailOfPatient,
      subject: "New Appointment",
      text: `You have a new appointment at ${appointment_date} ${appointment_time}`,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
}
