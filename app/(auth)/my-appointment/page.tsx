import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import PatientDashboardShared  from "@/components/shared/patientdashboardshared";
import NavBars from "@/components/navbars/NavBars";
import {getAppointmentbyPatient} from '@/lib/actions/appointment.actions'
import MyAppointMentShow from "@/components/shared/MyAppointMentShow";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchDoctorById } from "@/lib/actions/doctor.actions";

import appointment from "@/lib/models/appointment.model";
const Page = async ({ searchParams }: any) => {

    
  const user = await currentUser();
  if(!user ){
    redirect('/account');
  }
  const myAppointments = await getAppointmentbyPatient({patient_id: user.id});
 const patientname =  await fetchUser(user.id);
 let name = "";
 if(!patientname.name || patientname.name == "" ){
    name = patientname.username;
    }else{
        name = patientname.name;
    }
    type AppointmentType = {
        id: string;         patient_name: string;
        doctor_name: string;
        doctor_id: string;
        patient_id: string;
        appointment_time: string;
        appointment_date: Date;
      };
      
  const newAppointment: AppointmentType[] = [];
 const appointmentsWithDoctorNames = await Promise.all(myAppointments.map(async appointment => {
    const doctorName = await fetchDoctorById(appointment.doctor_id);
    let doctorString = "";
    if(doctorName.name == "" && !doctorName.name){
        doctorString = doctorName.username;
    }else{
        doctorString = doctorName.name;
    }


   const localAppointment = {
        id : appointment.id,
        patient_name: name,
        doctor_name : doctorString,
        doctor_id: appointment.doctor_id,
        patient_id : appointment.patient_id,
        appointment_time: appointment.appointment_time,
        appointment_date: appointment.appointment_date
    }

    newAppointment.push(localAppointment);


}));




  return (
      <div className="bg-white">

      <NavBars />
      <div className="mt-[50px] pt-[50px]"></div>
      {newAppointment.map(appointment => (
        
      <MyAppointMentShow 
      id={appointment.id}
      doctor_id = {appointment.doctor_id}
      patient_id = {appointment.patient_id}
      appointment_date = {appointment.appointment_date}
      appointment_time = {appointment.appointment_time}
      patient_name= {appointment.patient_name}
      doctor_name = {appointment.doctor_name}
      />
      ))}

       
    
     
    </div>
  );
};
export default Page;
