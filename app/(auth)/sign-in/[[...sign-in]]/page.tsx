"use client";
import { redirect } from "next/navigation";

import NavBar from "@/components/shared/navbar";
import { SignIn, SignUp } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
const Page = () => {
  
  const pathname = usePathname();
  

  return (
    <div className={` ${pathname === "/" ? "navbar_with_image" : "navbar"} `}>
      <div>
        <NavBar />

        <div className="mt-5 flex justify-center items-center ">
          <SignIn />
        </div>
      </div>
      <footer className="bg-blue-egg-dark text-center py-4 absolute bottom-0 w-full">
        Trademark &copy; DocPoc
      </footer>
    </div>
  );
};
export default Page;
