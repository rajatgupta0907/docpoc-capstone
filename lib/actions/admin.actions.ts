"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import doctor from "../models/doctor.model";
import { connectToDb } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  phonenumber: string;
  speciality: string;
  emergency: string;
}


interface VerifiedParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  isVerified: Boolean;
  phonenumber: string;
  speciality: string;
  emergency: string;
}

export async function detailsfetchdoctor(userId: string) {
  try {
    connectToDb();

    return await doctor.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
export async function fetchDoctor(userId: string) {
  try {
    connectToDb();
    const data = await doctor.findOne({ id: userId });
    if (data) {
      console.log("FETCH_DOCTOR",data)
      return data;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateDoctor({
  userId,
  bio,
  name,
  path,
  username,
  phonenumber,
  image,
  speciality,
  emergency
}: Params): Promise<void> {
  try {
    connectToDb();

    await doctor.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        bio,
        image,
        phonenumber,
        speciality,
        onboarded: true,
        emergency
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}



export async function isVerifiedUpdateDoctor({
  userId,
  bio,
  name,
  username,
  phonenumber,
  image,
  isVerified,
  speciality,
  emergency
}: VerifiedParams): Promise<void> {
  try {
    connectToDb();

    await doctor.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        bio,
        image,
        phonenumber,
        speciality,
        isVerified: true,
        onboarded: true,
        emergency
      },
      { upsert: true }
    );

  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getDoctor(perPage: number, page: number) {
  try {
    console.log("Perpage" + perPage + "Page" + page);
    // DB Connect
    const client = await connectToDb();

    // DB Query
    const itemsQuery = doctor
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage);
    const items = await itemsQuery.exec();
    const itemCount = await doctor.countDocuments({});

    const respnse = { items, itemCount };
    return respnse;
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}
