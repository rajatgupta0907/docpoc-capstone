import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  phonenumber: z
    .string()
    .min(10, { message: "Only 10 Characeters are allowed" })
    .max(10, { message: "Only 10 Characeters are allowed" }),
  speciality: z.string({
    required_error: "Please select an email to display.",
  }),
  emergency: z.string(),
});
export const DoctorSearchValidation = z.object({
  specialty: z.string({
    required_error: "Please select a specialty to display.",
  }),
  name: z.string(),
});
