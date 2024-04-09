// NavBar.jsx
import { NavLinksLanding } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`flex flex-col md:flex-row top-0 z-30 w-full items-center justify-between bg-dark-2 px-6 py-3 ${
        pathname === "/" ? "" : "bg-blue-egg"
      }`}
    >
      <div className="flex items-center gap-4 flex-[2]">
        <Link href={"/"}>
          <p
            className={`text-heading3-bold text-light-1 max-xs:hidden ${
              pathname === "/services" ? "text-white" : ""
            }`}
          >
            Doc Poc
          </p>
        </Link>
      </div>
      <div className="md:hidden">
        <button
          className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        className={`md:flex items-center justify-center flex-[4] ml-20 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {NavLinksLanding.map((link) => (
          <Link
            key={link.link}
            href={link.link}
            className={`text-heading2-bold relative flex flex-row justify-center gap-4 rounded-lg p-4 font-semibold mx-4 ${
              link.link === "/account" ? "ml-auto" : ""
            } ${menuOpen ? "text-white" : ""} md:text-xl`}
          >
            {link.displayName}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
