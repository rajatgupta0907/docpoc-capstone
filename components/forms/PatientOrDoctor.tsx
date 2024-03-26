"use client";

import { useState } from "react";
import { saveSpecialtyToUser } from "@/lib/actions/user.actions";
import { saveSpecialtyToDoctor } from "@/lib/actions/doctor.actions";
interface Props {
  userId: string;
  username: string;
}
async function saveSpecialtyType(
  profileType: string,
  username: string,
  userId: string,
  setSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    if (profileType === "patient") {
      await saveSpecialtyToUser({
        userId: userId,
        username: username,
        profileType: profileType,
      });
      window.location.href = "/patient-dashboard";
    } else {
      await saveSpecialtyToDoctor({
        userId: userId,
        username: username,
        profileType: profileType,
      });
      window.location.href = "/doctor-admin";
    }
    setSuccessMessage(true);
  } catch (error) {
    alert(error);
    console.error("Error saving specialty type:", error);
    // Handle error
  }
  setSuccessMessage(true);
}

const PatientOrDoctor = ({ userId, username }: Props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );

  return (
<main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
<img
    src="/assets/images/doctor.jpg"
    className="max-w-full h-auto rounded-lg shadow-lg"
    alt="Doctor"
  />
  <h1 className="head-text text-black text-3xl font-bold mb-5">Welcome to DOCPOC</h1>
  <h4 className="head-text text-lg text-black mb-8">Please Select your Specialty Type</h4>
  <div className="flex justify-center space-x-8">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-lg uppercase tracking-wide"
      onClick={() => {
        setSelectedSpecialty("patient");
      }}
    >
      Patient
    </button>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-lg uppercase tracking-wide"
      onClick={() => {
        setSelectedSpecialty("doctor");
      }}
    >
      Doctor
    </button>
  </div>
  {selectedSpecialty && (
    <button
      onClick={() =>
        saveSpecialtyType(
          selectedSpecialty,
          username,
          userId,
          setShowSuccessMessage
        )
      }
      className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-lg"
    >
      Save
    </button>
  )}
  {showSuccessMessage && <p className="mt-4 text-green-600">Specialty type saved successfully!</p>}
</main>
  );
};

export default PatientOrDoctor;
