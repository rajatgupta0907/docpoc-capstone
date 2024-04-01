import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import PatientDashboardShared  from "@/components/shared/patientdashboardshared";
import NavBars from "@/components/navbars/NavBars";
import {getMedicinesByDoctor} from '@/lib/actions/medicine.actions'
import MyDoctorMedicinesShow from "@/components/shared/MyDoctorMedicinesShow";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchDoctorById } from "@/lib/actions/doctor.actions";
import DoctorNavbar from "@/components/navbars/DoctorNavbar";
import Link from "next/link";

const Page = async ({ searchParams }: any) => {

    
  const user = await currentUser();
  if(!user ){
    redirect('/account');
  }
  const myAppointments = await getMedicinesByDoctor({doctor_id: user.id});
 
  const doctorname =  await fetchDoctorById(user.id);
 let name = "";
 if(!doctorname.name || doctorname.name == "" ){
    name = doctorname.username;
    }else{
        name = doctorname.name;
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
    const patientname = await fetchUser(appointment.patientid);
    let patientString = "";
    if(patientname.name == "" && !patientname.name){
        patientString = patientname.username;
    }else{
        patientString = patientname.name;
    }


   const localAppointment = {
        _id : appointment.id,
        patient_name: patientString,
        doctor_name : name,
        doctorid: appointment.doctorid,
        patientid : appointment.patientid,
        typeofdisease:appointment.typeofdisease,
        uniqueappointmentid: appointment.uniqueappointmentid
      }

    newAppointment.push(localAppointment);


}));




  return (
      <div className="bg-white">

      <DoctorNavbar />
      <div className="mt-[50px] pt-[50px]"></div>
      <br></br>
      <Link
                  href={`/doctor-prescription`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
      {newAppointment.map(appointment => (
        
      <MyDoctorMedicinesShow 
      id = {appointment._id}

      patient_name = {appointment.patient_name} 
      doctor_name= {appointment.doctor_name}
      uniqueappointmentid = {appointment.uniqueappointmentid}
      typeofdisease = {appointment.typeofdisease}
      doctorid = {appointment.doctorid}
      patientid = {appointment.patientid}
        
      />
    ))}

       
    
     
    </div>
  );
};
export default Page;
