"use client";
import { NavLinksLanding } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Params {
        id: string;
        patientid: string;
        doctorid: string;
        uniqueappointmentid: string;
        typeofdisease: string;
        patient_name: string;
        doctor_name: string;

    
}
const MyDoctorMedicinesShow = ({id,doctorid,patientid,uniqueappointmentid,typeofdisease,patient_name,doctor_name}: Params) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
    <div className="md:flex">
        <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Doctor Name {doctor_name}</div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">Type of Disease: {typeofdisease}</p>

        <p className="mt-2 text-gray-500">{patient_name}</p>
        
        <Link  href={`/doctor-view-medicines/${id}`}
         className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                View  Medicines
        </Link>
        
        </div>
    </div>
    </div>
  );
};
export default MyDoctorMedicinesShow;
