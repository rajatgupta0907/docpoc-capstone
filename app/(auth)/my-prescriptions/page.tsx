import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import PatientDashboardShared  from "@/components/shared/patientdashboardshared";
import NavBars from "@/components/navbars/NavBars";
import {getMedicinesByPatient} from '@/lib/actions/medicine.actions'
import MyMedicinesShow from "@/components/shared/MyMedicinesShow";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchDoctorById } from "@/lib/actions/doctor.actions";
import Link from "next/link";

const Page = async ({ searchParams }: any) => {

    
  const user = await currentUser();
  if(!user ){
    redirect('/account');
  }
  const myAppointments = await getMedicinesByPatient({patient_id: user.id});
 const patientname =  await fetchUser(user.id);
 let name = "";
 if(!patientname.name || patientname.name == "" ){
    name = patientname.username;
    }else{
        name = patientname.name;
    }
    type AppointmentType = {
        _id: string;         
        patient_name: string;
        doctor_name: string;
        doctorid: string;
        patientid: string;
        uniqueappointmentid: string;
        typeofdisease:string;
      };
      
  const newAppointment: AppointmentType[] = [];
 const appointmentsWithDoctorNames = await Promise.all(myAppointments.map(async appointment => {
    const doctorName = await fetchDoctorById(appointment.doctorid);
    let doctorString = "";
    if(doctorName.name == "" && !doctorName.name){
        doctorString = doctorName.username;
    }else{
        doctorString = doctorName.name;
    }


   const localAppointment = {
        _id : appointment.id,
        patient_name: name,
        doctor_name : doctorString,
        doctorid: appointment.doctorid,
        patientid : appointment.patientid,
        typeofdisease:appointment.typeofdisease,
        uniqueappointmentid: appointment.uniqueappointmentid
      }

    newAppointment.push(localAppointment);


}));




  return (
      <div className="bg-white">

      <NavBars />
      <div className="mt-[50px] pt-[50px]"></div>
      <Link
                  href={`/patient-dashboard`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
                <br></br>
      {newAppointment.map(appointment => (
        
      <MyMedicinesShow 
      id = {appointment._id}

      patient_name = {appointment.patient_name} 
      doctor_name= {appointment.doctor_name}
      uniqueappointmentid = {appointment.uniqueappointmentid}
      typeofdisease = {appointment.typeofdisease}
      doctorid = {appointment.doctorid}
      patientid = {appointment.patientid}
        
      />
    ))}

<br></br>
<Link
                  href={`/patient-dashboard`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
    
     
    </div>
  );
};
export default Page;
