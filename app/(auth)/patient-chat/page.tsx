"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { deleteAppointment } from "@/lib/actions/appointment.actions";
import { redirect } from "next/navigation";

const Page = ({ context }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const doctor_id = searchParams.get("doctor_id");
  const patient_id = searchParams.get("patient_id");

  console.log("ID:", id);
  console.log("Doctor ID:", doctor_id);
  console.log("Patient ID:", patient_id);

  return (
    <div className="text-black">
      <h2>Chat With The Doctor</h2>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3"></div>
    </div>
  );
};
export default Page;
