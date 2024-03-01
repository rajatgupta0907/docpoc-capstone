"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  phonenumber: string;
}


export async function fetchUser(userId: string) {
  try {
    connectToDb();
    const data =  await User.findOne({ id: userId });
    if(data){
      return data;
    }else{
      return null;
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,

  phonenumber,
  image,
}: Params): Promise<void> {
  try {
    connectToDb();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        bio,
        image,
        phonenumber,
        onboarded: true,
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



interface SpecialityParams{
  userId: string,
  profileType: string,
  username: string
}

export async function saveSpecialtyToUser({
  userId,
  profileType,
  username
}: SpecialityParams): Promise<boolean> {

  try {
    connectToDb();
    console.log("userId", userId);
    const result= await User.findOneAndUpdate(
      { id:  userId},
      {
        username: username,
        name: "",
      profileType: "patient"
      },
      { upsert: true }
    );

    if (result) {
      return !!result.lastErrorObject?.updatedExisting; 
    } else {

      return false;
    }

      
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}



