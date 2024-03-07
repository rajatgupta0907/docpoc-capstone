"use client";
import DisplayDoctors from "@/components/cards/DisplayDoctors";
import { useState } from "react";
import DoctorFilter from "@/components/forms/DoctorFilter";
import styles from '/globals.css'; 

interface Params{
  search: any
}
const PatientDashboardShared  = ({ search }: Params) => {
  const [filters, setFilters] = useState<{ name: string; specialty: string }>();
  const [doctors, setDoctors] = useState<any>();
  let page = parseInt(search.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 4;

  // const user = await currentUser();
  // const totalPages = Math.ceil(data.itemCount / perPage);
  console.log(doctors);

  return (
    <>
      <h1 className="text-black text-3xl">Find Your Doctor Now</h1>
      <div className="flex flex-row items-center">
        <DoctorFilter setDoctors={setDoctors} page={page} perPage={perPage} />
      </div>
      <div className="flex flex-row space-y-6 items-center">
        {" "}
        {/* Flex container with column layout */}
        {doctors &&
          doctors.items &&
          doctors.items.map((item: any) => (
            <DisplayDoctors
              key={item.id}
              id={item.id}
              bio={item.bio}
              image={item.image}
              name={item.name}
              speciality={item.speciality}
              isVerified = {item.isVerified}
            />
          ))}
      </div>
    </>
  );
};
export default PatientDashboardShared ;
