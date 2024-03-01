import { redirect } from "next/navigation";

import {  currentUser } from "@clerk/nextjs";
import PatientOrDoctor from "@/components/forms/PatientOrDoctor";
import { usePathname } from "next/navigation";
import SignInNavbar from "@/components/shared/SignInNavbar";
const Page = async () => {
  const user = await currentUser();
  if(!user){
    redirect('/account');
  }  
  return(
        <>
        <PatientOrDoctor userId={user.id} />
            
        </>
    );
};
export default Page;