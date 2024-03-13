import { fetchDoctor } from "@/lib/actions/admin.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PatientDashboardShared  from "@/components/shared/patientdashboardshared";
import Link from 'next/link';
import NavBars from "@/components/navbars/NavBars";
const Page = async ({ searchParams }: any) => {

  const user = await currentUser();
  if(!user ){
    redirect('/account');
  }

  const fetchUsers =  await fetchUser(user.id);
  
  const fetchDoctors =  await fetchDoctor(user.id);
  if (!fetchUsers && !fetchDoctors) {
    redirect('/patientordoctor');
  
  }else if(fetchDoctors){
    redirect("/doctor-dashboard");
  }
  
  return (
      <div className="bg-white">

      <NavBars />

      <PatientDashboardShared  search= {4}/>
      </div>
  );
};
export default Page;
