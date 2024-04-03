"use server";


import verification from "../models/verification.model";
import { connectToDb } from "../mongoose";

interface Props {
  id: string;
  url: string[];
}


interface SpecialityParams{
  userId: string,
  profileType: string,
  username: string
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



