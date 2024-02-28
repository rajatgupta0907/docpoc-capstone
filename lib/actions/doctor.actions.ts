"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Doctor from "../models/doctor.model";
import { connectToDb } from "../mongoose";

interface Props {
  name: string;
  specialty: string;
}
export async function fetchDoctors({ name, specialty }: Props) {
  try {
    connectToDb();
    // find doctors by specialty and name if provided
    // return await Doctor.findOne({});

    // return await Doctor.find({ specialty: specialty, name: name });
    // const itemsQuery = Doctor.find({ specialty: specialty, name: name });
    if (name.trim() !== "") {
      const regex = new RegExp(name, "i");
      console.log("specialty", specialty);

      const items = await Doctor.find({ name: regex }).exec();
      const itemCount = await Doctor.countDocuments({});
      const response = { items, itemCount };
      console.log("should not be here");
      // console.log(response);
      return response;
    } else {
      console.log("should be here");
      const regex = new RegExp(specialty, "i");

      const items = await Doctor.find({ speciality: regex }).exec();
      const itemCount = await Doctor.countDocuments({});
      const response = { items, itemCount };
      return response;
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

// export async function updateUser({
//   userId,
//   bio,
//   name,
//   path,
//   username,

//   phonenumber,
//   image,
// }: Params): Promise<void> {
//   try {
//     connectToDb();
//     await User.findOneAndUpdate(
//       { id: userId },
//       {
//         username,
//         name,
//         bio,
//         image,
//         phonenumber,
//         onboarded: true,
//       },
//       { upsert: true }
//     );

//     if (path === "/profile/edit") {
//       revalidatePath(path);
//     }
//   } catch (error: any) {
//     throw new Error(`Failed to create/update user: ${error.message}`);
//   }
// }
