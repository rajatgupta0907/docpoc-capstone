"use client";
import { Button } from "@/components/ui/button";
import { fetchDoctor, isVerifiedUpdateDoctor } from "@/lib/actions/admin.actions";
import Link from "next/link";
import { useState, useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    async function fetchDoctorDetails() {
      try {
        const response = await fetchDoctor(params.id);
        setDoctor(response);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    }

    fetchDoctorDetails();
  }, [params.id]);

  const handleApprove = async () => {
    try {
      await isVerifiedUpdateDoctor({
        userId: params.id,
        bio: doctor.bio,
        name: doctor.name,
        
        username: doctor.username,
        phonenumber: doctor.phonenumber,
        image: doctor.image,
        isVerified: true, 
        speciality: doctor.speciality,
      });
      // Refresh the doctor details after updating the status
      alert("approved");
      window.location.href="/our-admin-dashboard";
      const updatedDoctor = await fetchDoctor(params.id);
      setDoctor(updatedDoctor);
    } catch (error) {
      console.error("Error updating doctor status:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>
        {doctor ? (
          <div>
            <img src={doctor.image} alt={doctor.name} />
            <p className="text-black">
              <span className="font-bold">Name:</span> {doctor.name}
            </p>
            <p className="text-black">
              <span className="font-bold">Speciality:</span> {doctor.speciality}
            </p>
            <p className="text-black">
              <span className="font-bold">Phone Number:</span> {doctor.phonenumber}
            </p>
            <p className="text-black">
              <span className="font-bold">Bio:</span> {doctor.bio}
            </p>
          </div>
        ) : (
          <p className="text-black">Loading...</p>
        )}
        <div className="flex flex-wrap">
          <button onClick={handleApprove} className="block w-32 px-4 py-2 bg-green-800 text-white font-bold rounded mr-4">
            Approve
          </button>
          <Link href={`/our-admin-doctor-reject`} className="block w-32 px-4 py-2 bg-red-800 text-white font-bold rounded">
            Reject
          </Link>
        </div>
      </div>
      <Link href={`/our-admin-dashboard`} className="block w-32 px-4 py-2 bg-gray-800 text-white font-bold rounded mt-4">
        Go Back
      </Link>
    </div>
  );
};

export default Page;
