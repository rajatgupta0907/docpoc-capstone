"use client";
import DisplayDoctors from "@/components/cards/DisplayDoctors";
import { useState } from "react";
import DoctorFilter from "@/components/forms/DoctorFilter";
// TODO fix the paratmeter type
const Page = ({ searchParams }: any) => {
  const [filters, setFilters] = useState<{ name: string; specialty: string }>();
  const [doctors, setDoctors] = useState<any>();
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 4;

  // const user = await currentUser();
  // const totalPages = Math.ceil(data.itemCount / perPage);
  console.log(doctors);

  return (
    <>
      <h1 className="text-white text-3xl">Find Your Doctor Now</h1>
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
            />
          ))}
      </div>
    </>
  );
};
export default Page;
