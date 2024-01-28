"use client";
import NavBar from "@/components/shared/navbar";
import { usePathname } from "next/navigation";
const Page = () => {
  const pathname = usePathname();

  return (
    <div className={` ${pathname === "/" ? "navbar_with_image" : "navbar"}`}>
    <NavBar />
  </div>
  );
};
export default Page;
