import { fetchDoctor } from "@/lib/actions/admin.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PatientDashboardShared  from "@/components/shared/patientdashboardshared";
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
    // doctors is here
    // redirect()
  }
  
  return (
    <>
      <PatientDashboardShared  search= {4}/>
    </>
  );
};
export default Page;
