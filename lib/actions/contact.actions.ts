"use server";
import appointment from "../models/appointment.model";
import { connectToDb } from "../mongoose";
import { ObjectId } from "mongodb";
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

export async function contactUs({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await sendEmail({
      to: email,
      subject: subject,
      text: message,
    });
    await sendEmail({
      to: "rajatgcanada1@gmail.com",
      subject: "Contact Us" + subject,
      text: `You have a new message at ${message}`,
    });

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
}

export async function rescheduleAppointment({
  doctor_id,
  patient_id,
  appointment_date,
  appointment_time,
  prev_id,
}: {
  doctor_id: string;
  patient_id: string;
  appointment_date: string;
  appointment_time: string;
  prev_id: string;
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
    const query = { _id: prev_id };

    const result = await appointment.findOneAndDelete(query);
    console.log(result);
    revalidatePath("/appointments");
    const emailOfDoctor = await getUserEmail(doctor_id);
    const emailOfPatient = await getUserEmail(patient_id);
    console.log(emailOfDoctor, emailOfPatient);
    //
    await sendEmail({
      to: emailOfDoctor,
      subject: "Updated Appointment",
      text: `Your appointment has been updated. Your new appointment is at ${appointment_date} ${appointment_time}`,
    });
    await sendEmail({
      to: emailOfPatient,
      subject: "Updated Appointment",
      text: `Your appointment has been updated. Your new appointment is at ${appointment_date} ${appointment_time}`,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
}

export async function deleteAppointment({ _id }: { _id: string }) {
  console.log(_id);
  try {
    connectToDb();
    let deleteapp = {
      _id: _id,
    };
    const data = await appointment.findById(deleteapp);
    const emailOfDoctor = await getUserEmail(data.doctor_id);
    const emailOfPatient = await getUserEmail(data.patient_id);
    await sendEmail({
      to: emailOfDoctor,
      subject: "Appointment Canceled",
      text: `Your Appointment has been canceled. Thank you!`,
    });
    await sendEmail({
      to: emailOfPatient,
      subject: "Appointment Canceled",
      text: `Your Appointment has been canceled. Thank you!`,
    });
    await data.deleteOne();
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log("error" + error.message);
  }
}

export async function getAppointmentbyPatient({
  patient_id,
}: {
  patient_id: string;
}) {
  try {
    connectToDb();
    // find out if the same appointment exists
    const data = await appointment.find({
      patient_id,
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to find appointment: ${error.message}`);
  }
}

export async function getAppointmentbyDoctor({
  doctor_id,
}: {
  doctor_id: string;
}) {
  try {
    connectToDb();
    // find out if the same appointment exists
    const data = await appointment.find({
      doctor_id,
    });

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to find appointment: ${error.message}`);
  }
}
