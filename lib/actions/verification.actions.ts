"use server";


import verification from "../models/verification.model";
import { connectToDb } from "../mongoose";

interface Props {
  id: string;
  url: string[];
}

export async function createverificationDoctor({ id, url }: Props) {
  try {
    connectToDb();
    const newVerification = new verification({
      doctor_id: id,
      urls: url.map((myurl : any)=>({
        url: myurl
      })),
    });

    // Save the new verification document to the database
    const savedVerification = await newVerification.save();

    return true;


  }catch(error: any){

  }
}




interface FindProps{
  id: string;
}
export async function FindVerificationDocuments({ id }: FindProps) {
  try {
    connectToDb();
    const itemsQuery = verification.find({ doctor_id: id });
    const items = await itemsQuery.exec();
    console.log(items);
    return JSON.stringify(items);

  } catch (error) {
    console.error("Error in FindVerificationDocuments:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}