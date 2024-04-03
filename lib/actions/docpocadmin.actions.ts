"use server";


import verification from "../models/verification.model";
import doctor from "../models/doctor.model";
import { connectToDb } from "../mongoose";

interface Props {
  id: string;
  url: string[];
}


export async function findDoctor() {
  try {
    connectToDb();
   
    const data = await doctor.find({isVerified: false});
    return data;

  }catch(error: any){

  }
}



