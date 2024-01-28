import { NavLinksLanding } from "@/lib/constants";
import Link from "next/link";

const NavBar = async () => {
  return (
    <nav className="fixed flex-row top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href={"/"} className="flex items-center gap-4 flex-[2]">
        <p className="text-heading3-bold text-light-1 max-xs:hidden text-blue-egg">
          Doc Poc
        </p>
      </Link>
      <div className="other_links flex flex-row justify-center items-center flex-[4] ml-20">
        {/* <Link href="/our-doctors">Our Doctors</Link> */}
        {NavLinksLanding.map((link) => {
          return (
            <Link
              key={link.link}
              href={link.link}
              className={`text-5xl relative flex flex-row justify-center gap-4 rounded-lg p-4 font-semibold mx-4 ${
                link.link === "/account" ? "ml-auto" : ""
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
