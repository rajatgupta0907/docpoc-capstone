import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchDoctor } from "@/lib/actions/admin.actions";
import DoctorNavbar from '@/components/navbars/DoctorNavbar';

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
      </div>
   </div>
  );
}

export default Page;
