"use client";
import DisplayDoctors from "@/components/cards/DisplayDoctors";
import { useState } from "react";
import DoctorFilter from "@/components/forms/DoctorFilter";


interface Params{
  search: any
}
const PatientDashboardShared  = ({ search }: Params) => {
  const [filters, setFilters] = useState<{ name: string; specialty: string }>();
  const [doctors, setDoctors] = useState<any>();
  let page = parseInt(search.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 100000;

  // const user = await currentUser();
  // const totalPages = Math.ceil(data.itemCount / perPage);
  console.log(doctors);

  return (
    <>
    
<div  className="find_your_doctor">

<h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 text-cenetr">Find Your Doctor Now</h1>
<DoctorFilter setDoctors={setDoctors} page={page} perPage={perPage} />

</div>

      <div className="w-full flex flex-wrap mt-10">

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
