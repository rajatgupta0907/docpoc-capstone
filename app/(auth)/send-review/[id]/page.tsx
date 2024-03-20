import {  currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import NavBars from '@/components/navbars/NavBars';
import SendReviewCards from "@/components/cards/SendReviewCards";


const Page = async ({ params }: { params: { id: string } }) => {

  const doctor_id = params.id;
  const user = await currentUser();

  if(!user ){
    redirect('/account');
  }

  let patient_id = user.id;


  return (
    <>
      <div className='mb-[150px]'>
        <NavBars />
      </div>
      <SendReviewCards
       patient_id={patient_id} 
       doctor_id={doctor_id}
      />

    </>
  );
}

export default Page;
