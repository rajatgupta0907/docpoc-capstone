import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page(){
    const user= await currentUser();
    const userInfo = {};
    // const userData = {
    //     id:user?.id,
    //     email:user?.emailAddresses,
    //     objectid: userInfo?._id,
    //     username:user?.username || userInfo?.username,
    //     name: userInfo?.name || user?.firstName || "",
    //     age:userInfo?.age,
    //     bio:userInfo?.bio,
    //     image:userInfo?.image || user?.imageUrl

    //     }
    return (
        <main className="mx-auto flex max-w-3xl flex-col justify start px-10 py-20">
            <h1 className="head-text">On Boarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete Your Profile Bio
            </p>
            <section className="mt-9 bg-white-2 p-10">
            </section>
        </main>
    )
}

export default Page;