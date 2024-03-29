import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DoctorNavbar from '@/components/navbars/DoctorNavbar';
import { fetchDoctor } from "@/lib/actions/admin.actions";
import DoctorProfile from "@/components/forms/DoctorProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchDoctor(user.id);
  if (userInfo?.onboarded) redirect("/");
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo.bio.length > 0 ? userInfo.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    phonenumber: userInfo.phonenumber.length > 0 ? userInfo.phonenumber : "",
    isVerified: userInfo ? userInfo?.isVerified : "",
    speciality: userInfo ? userInfo?.speciality : "",
  };
  console.log("USER_INFO", userData);

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 text-black">
      <DoctorNavbar/>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile 
      </p>
      <DoctorProfile doctor={userData} btnTitle="Continue" />

      <section className="mt-9 bg-dark-2 p-10"></section>
    </main>
  );
}

export default Page;
