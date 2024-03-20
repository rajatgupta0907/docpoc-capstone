"use server";

import { connectToDb } from "../mongoose";

import rating from "../models/rating.model";

interface Params {
    formData: FormData;
  }
  

  export async function createRating(formData: FormData): Promise<boolean> {
    try {
        connectToDb();
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const doctor_id = formData.get("doctor_id") as string;
      const patient_id = formData.get("patient_id") as string;
      const newratingString = formData.get("rating") as string;
      const newrating = parseInt(newratingString);
      console.log(newrating);
      await rating.create({
        patient_id: patient_id,
        doctor_id: doctor_id,
        rating: newrating,
        description: description,
        name: name
      });

    
  

      return true;
    } catch (error) {
      // If an error occurred, handle it and return false
      console.error(error);
      return false;
    }
  }


  
  export async function getRatingByPatient({
    patient_id,
  }: {
    patient_id: string;
  }) {
    try {
      connectToDb();
      // find out if the same appointment exists
      const data = await rating.find({
        patient_id,
      });
  
      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Failed to find appointment: ${error.message}`);
    }
  }

  
  export async function getRatingByDoctor({
    doctor_id,
  }: {
    doctor_id: string;
  }) {
    try {
      connectToDb();
      // find out if the same appointment exists
      const data = await rating.find({
        doctor_id,
      });
  
      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Failed to find appointment: ${error.message}`);
    }
  }


  