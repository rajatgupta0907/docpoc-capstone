import { createAppointment } from "@/lib/actions/appointment.actions";
import NavBars from "@/components/navbars/NavBars";
import { fetchbymedicinesappointment } from "@/lib/actions/medicine.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchDoctorById } from "@/lib/actions/doctor.actions";

const Page = async ({ params }: { params: { id: string } }) => {

  // Fetch data from the database
  const fetchDataFromDatabase = await fetchbymedicinesappointment({ id: params.id });
  const patientname =  await fetchUser(fetchDataFromDatabase[0].patientid);
  const doctorName = await fetchDoctorById(fetchDataFromDatabase[0].doctorid);
  let name = "";
  if(!patientname.name || patientname.name == "" ){
     name = patientname.username;
     }else{
         name = patientname.name;
     }
     let doctorString = "";
     if(doctorName.name == "" && !doctorName.name){
         doctorString = doctorName.username;
     }else{
         doctorString = doctorName.name;
     }
 
 
 
  return (
    <>
      <NavBars />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Appointment Details</h1>
        <div className="bg-blue-500 p-6 rounded-lg shadow-md">
          <p><span className="font-semibold">Patient Name:</span> {name}</p>
          <p><span className="font-semibold">Doctor Name:</span> {doctorString}</p>
          <p><span className="font-semibold">Appointment Unique ID:</span> {fetchDataFromDatabase[0].uniqueappointmentid}</p>
          <p><span className="font-semibold">Type of Disease:</span> {fetchDataFromDatabase[0].typeofdisease}</p>
        </div>
        <h2 className="text-2xl font-semibold text-black mt-8 mb-4">Medicines Prescribed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fetchDataFromDatabase[0].medicines.map((medicine : any, index : any) => (
            <div key={index} className="p-4 bg-green-500 shadow rounded-lg">
              <h2 className="text-xl font-semibold text-green-700">{medicine.medicinename}</h2>
              <p>Type: {medicine.medicinetype}</p>
              <p>Quantity: {medicine.medicineqty}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
