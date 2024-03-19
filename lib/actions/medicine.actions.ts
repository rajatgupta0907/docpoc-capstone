"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import doctor from "../models/doctor.model";
import { connectToDb } from "../mongoose";

import Medicines from "../models/medicines.model";

interface Params {
    formData: FormData;
  }
  

  export async function createMedicines(formData: FormData): Promise<boolean> {
    try {
        connectToDb();
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const medicines = JSON.parse(formData.get('medicines') as string);
      const uniqueaptid = formData.get("uniqueaptid") as string;
      const doctor_id = formData.get("doctor_id") as string;
      const patient_id = formData.get("patient_id") as string;
    const typeofdisease= formData.get("typeofdisease") as string;
      // Save the data to MongoDB
      await Medicines.create({
        patientid: patient_id,
        doctorid: doctor_id,
        uniqueappointmentid: uniqueaptid,
        typeofdisease: typeofdisease,

        medicines: medicines.map((medicine: any) => ({
          medicinename: medicine.name,
          medicinetype: medicine.doseType,
          medicineqty: medicine.totalTablets
        }))

      });
  

      return true;
    } catch (error) {
      // If an error occurred, handle it and return false
      console.error(error);
      return false;
    }
  }


  
  export async function getMedicinesByPatient({
    patient_id,
  }: {
    patient_id: string;
  }) {
    try {
      connectToDb();
      // find out if the same appointment exists
      const data = await Medicines.find({
        patient_id,
      });
  
      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(`Failed to find appointment: ${error.message}`);
    }
  }


  
  export async function fetchbymedicinesappointment({
    id
  }: {
    id: string;
  }) {
    try {
      connectToDb();
      // find out if the same appointment exists
      const data = await Medicines.find({
        _id: id
      });
      console.log(data);
      return data;
      
    } catch (error: any) {
      console.log(error);
      throw new Error(`Failed to find appointment: ${error.message}`);
    }
  }