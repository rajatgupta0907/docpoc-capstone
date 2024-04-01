"use client";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import  Link  from "next/link";
import { useSearchParams } from 'next/navigation'
import {deleteAppointment} from '@/lib/actions/appointment.actions';
import { redirect } from "next/navigation";

const Page =   ( {context}: any) => {
    const clerk = useClerk();
    const currentUser = clerk.user;
  
    const router = context;
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const doctor_id = searchParams.get('doctor_id');
    const patient_id = searchParams.get('patient_id');
    const doctor_name = searchParams.get('doctor_name');
    const patient_name = searchParams.get('patient_name');
    const appointment_date = searchParams.get('appointment_date');
    const appointment_time= searchParams.get('appointment_time');

        console.log('ID:', id);
console.log('Doctor ID:', doctor_id);
console.log('Patient ID:', patient_id);
console.log('Doctor Name:', doctor_name);
console.log('Patient Name:', patient_name);
console.log('Appointment Date:', appointment_date);
console.log('Appointment Time:', appointment_time);

const handleDeleteAppointment = async () => {
  try {
      const response = await deleteAppointment(
        {_id:id || ''}
        );

        if(response){
          window.location.href = '/doctor-appointment';
        }
  } catch (error) {
      // Handle network or other errors
      console.error('Error deleting appointment:', error);
      alert(error);
  }
};


  return (
      <div className="">

        <h2> Are You Sure That You Want To Delete Your Appointment</h2>
      
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
    <div className="md:flex">
        <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Doctor Name {doctor_name}</div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">Appointment Time: {appointment_time}</p>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">Appointment Date: {appointment_date}</p>

        <p className="mt-2 text-gray-500">{patient_name}</p>
        
        
        <Link  href='/doctor-appointment' className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          No
        </Link>
        <Button  onClick={handleDeleteAppointment}     
                  className="mt-5 ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
           Yes I Want to Delete Appointment
        </Button>
        </div>
    </div>
    </div>

    <br></br>
      <Link
                  href={`/doctor-appointment`}
                  className="w-full mt-10 px-4  py-2 bg-transparent border-2 border-gray-800 text-gray-800 font-bold rounded"
                >
                  Go Back
                </Link>
      </div>
  );
};
export default Page;
