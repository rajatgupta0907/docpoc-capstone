"use client";
import { NavLinksLanding } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Params {
  id: string;
  doctor_id: string;
  patient_id: string;
  appointment_date: Date;
  appointment_time: string;
  patient_name: string;
  doctor_name: string;
}

const MyAppointMentShow = ({
  id,
  doctor_id,
  patient_id,
  appointment_date,
  appointment_time,
  patient_name,
  doctor_name,
}: Params) => {
  const pathname = usePathname();

  return (
    <div className="max-w-md mx-auto justify-center flex bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Doctor Name: {doctor_name}
          </div>
          <p className="block mt-4 text-lg leading-tight font-medium text-black">
            Appointment Time: {appointment_time}
          </p>
          <p className="block mt-2 text-lg leading-tight font-medium text-black">
            Appointment Date: {appointment_date.toLocaleDateString()}
          </p>
          <p className="mt-4 text-gray-500">Patient Name: {patient_name}</p>

          <div className="mt-8 flex flex-col space-y-4">
            <Link
              href={{
                pathname: "/patient-reschedule",
                query: {
                  id: id,
                  doctor_id: doctor_id,
                  patient_id: patient_id,
                  doctor_name: doctor_name,
                  patient_name: patient_name,
                  appointment_date: appointment_date.toLocaleDateString(),
                  appointment_time: appointment_time,
                },
              }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Reschedule Appointment
            </Link>
            <Link
              href={{
                pathname: "/patient-delete-appointment",
                query: {
                  id: id,
                  doctor_id: doctor_id,
                  patient_id: patient_id,
                  doctor_name: doctor_name,
                  patient_name: patient_name,
                  appointment_date: appointment_date.toLocaleDateString(),
                  appointment_time: appointment_time,
                },
              }}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
            >
              Cancel Appointment
            </Link>
            <Link
              href={{
                pathname: "/patient-chat",
                query: {
                  id: id,
                  doctor_id: doctor_id,
                  patient_id: patient_id,
                },
              }}
              className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition duration-300"
            >
              Start a Chat
            </Link>
            <Link
              href={{
                pathname: "/video",
                query: {
                  id: id,
                  doctor_id: doctor_id,
                },
              }}
              className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-md hover:bg-yellow-700 transition duration-300"
            >
              Start a Video Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointMentShow;
