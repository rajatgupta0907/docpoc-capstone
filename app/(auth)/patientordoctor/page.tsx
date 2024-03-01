import { redirect } from "next/navigation";

import {  currentUser } from "@clerk/nextjs";
import PatientOrDoctor from "@/components/forms/PatientOrDoctor";
import { usePathname } from "next/navigation";
import SignInNavbar from "@/components/shared/SignInNavbar";
import { useAuth } from "@clerk/nextjs";

const Page = async () => {

  const user = await currentUser();
  if(!user){
    redirect('/account');
  }  


  const email = user.emailAddresses;
  const newEmail = email[0].emailAddress.split('@')[0];  
  console.log(newEmail);
  function generateRandomNumber() {
    const minLength = 0; 
    const maxLength = 99999;
  
    return Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  }
  const randomNumber = generateRandomNumber();
  const concatEmail = newEmail +randomNumber;
  console.log(concatEmail);

  return(
        <>
        <PatientOrDoctor userId={user.id} username= {concatEmail} />
            
        </>
    );
};
export default Page;