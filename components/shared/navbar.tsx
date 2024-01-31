"use client";
import { NavLinksLanding } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav
      className={`flex-row top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3 ${
        pathname === "/services" ? "bg-blue-egg" : ""
      }`}
    >
      <Link href={"/"} className="flex items-center gap-4 flex-[2]">
        <p
          className={`text-heading3-bold text-light-1 max-xs:hidden ${
            pathname === "/services" ? "text-white" : ""
          }`}
        >
          Doc Poc
        </p>
      </Link>
      <div className="other_links flex flex-row justify-center items-center flex-[4] ml-20">
        {NavLinksLanding.map((link) => {
          return (
            <Link
              key={link.link}
              href={link.link}
              className={`text-heading2-bold relative flex flex-row justify-center gap-4 rounded-lg p-4 font-semibold mx-4 ${
                link.link === "/account" ? "ml-auto !text-heading2-account" : ""
              }`}
            >
              {link.displayName}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default NavBar;
