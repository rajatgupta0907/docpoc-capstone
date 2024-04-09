"use server";
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





export async function rejectcontactUs({
  id,
  subject,
  message,
}: {
  id: string;
  subject: string;
  message: string;
}) {
  try {
    const emailOfDoctor = await getUserEmail(id);
    await sendEmail({
      to: emailOfDoctor,
      subject: subject,
      text: message,
    });
    await sendEmail({
      to: "rajatgcanada1@gmail.com",
      subject: "Rejection" + subject,
      text: `You have a new message at ${message}`,
    });

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
}
