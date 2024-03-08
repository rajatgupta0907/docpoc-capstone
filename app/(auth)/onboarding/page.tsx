import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import NavBar from "@/components/shared/navbar";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
    phonenumber:userInfo? userInfo?.phonenumber : "",
  };

  return (



    <div style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
          <NavBar />

    <main  className='ob_main mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
      Let's Take the First Step Towards Better Health Together
      </p>

      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
    </div>
  );
}

export default Page;