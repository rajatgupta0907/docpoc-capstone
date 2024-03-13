import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchDoctor } from "@/lib/actions/admin.actions";
import DoctorNavbar from '@/components/navbars/DoctorNavbar';
import Link from "next/link";
async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchDoctor(user.id);
  if (userInfo?.onboarded) redirect("/account");

  
  return (
   <div className="bg-white">
      <DoctorNavbar />

      <div className="pt-[50px] mt-[50px]">
      <h4 className="bg-white text-black text-2xl">Welcome  </h4>
      <h3 className="bg-white text-black text-lg">Manage Your Profile </h3>
      <div className="p-20 bg-orange-200">
      <h3 className="text-orange-400 font-bold mb-4">Manage Your Appointment</h3>
      <div className="bg-white rounded-lg shadow-2xl flex  md:flex">
        <img src="/assets/images/manage_appointment.png" alt="Appointment" className="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        <div className="p-6">

      <div className="text-center">
          <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Manage Your Appointment</h2>
          <Link href="/doctor-appointment" className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> 
            Manage Your Doctor Appointment
          </Link>
      </div>

      

      </div>

      
      </div>
    </div>

    <div className="p-20 bg-orange-200 mt-[-50px]">
      <h3 className="text-orange-400 font-bold mb-4">Manage Your Prescription</h3>
      <div className="bg-white rounded-lg shadow-2xl flex  md:flex">
        <img src="/assets/images/manage_appointment.png" alt="Appointment" className="md:w-1/3 rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        <div className="p-6">

      <div className="text-center">
          <h2 className="font-bold text-xl md:text-3xl mb-2 text-orange-700">Manage Your Prescription</h2>
          <Link href="/doctor-prescription" className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> 
            Manage Your Prescription
          </Link>
      </div>

      

      </div>

      
      </div>
    </div>





      </div>
   </div>
  );
}

export default Page;
