import { createAppointment } from "@/lib/actions/appointment.actions";
import { fetchbymedicinesappointment } from "@/lib/actions/medicine.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import DisplayDetailedPrescriptions from "@/components/shared/DisplayDetailedPrescriptions";
import { fetchDoctorById } from "@/lib/actions/doctor.actions";
import DoctorNavbar from "@/components/navbars/DoctorNavbar";

const Page = async ({ params }: { params: { id: string } }) => {

  // Fetch data from the database
  const fetchDataFromDatabase = await fetchbymedicinesappointment({ id: params.id });
  const patientname =  await fetchUser(fetchDataFromDatabase[0].patientid);
  const doctorName = await fetchDoctorById(fetchDataFromDatabase[0].doctorid);
   
  let name = fetchDataFromDatabase[0].patientname;
  
     
  
     let doctorString = "";
     if(doctorName.name == "" && !doctorName.name){
         doctorString = doctorName.username;
     }else{
         doctorString = doctorName.name;
     }
     const datafromDatabase = {
      uniqueappointmentid : fetchDataFromDatabase[0].fetchDataFromDatabase,
      typeofdisease: fetchDataFromDatabase[0].typeofdisease,
      medicines: fetchDataFromDatabase[0].medicines
    }

    const medicinesnew = fetchDataFromDatabase[0].medicines.map((medicine: any) => ({
      medicinename: medicine.medicinename,
      medicinetype: medicine.medicinetype,
      medicineqty: medicine.medicineqty
    }));
  
    
 
  return (
    <>
      <DoctorNavbar />
      <DisplayDetailedPrescriptions
        patientname = {name}
        doctorname = {doctorString}
        uniqueappointmentid = {fetchDataFromDatabase[0].uniqueappointmentid}
        typeofdisease = {fetchDataFromDatabase[0].typeofdisease}
        medicines= {medicinesnew}
        description= {fetchDataFromDatabase[0].description}
      />
    </>
  );
};

export default Page;
