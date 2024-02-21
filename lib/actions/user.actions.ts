"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

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
    return await User.findOne({ id: userId });
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
