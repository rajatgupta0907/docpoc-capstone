"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function NavBars() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full bg-blue-500 fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <h2 className="text-2xl text-white-600 font-bold ">DOC POC</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
                        <ul className="h-screen md:h-auto items-center justify-center md:flex">
            <li className="pb-6 text-xl text-white-600 py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="/my-appointment" onClick={() => setNavbar(!navbar)}>
                Your Appointment
                </Link>
            </li>
            <li className="pb-6 text-xl text-white-600 py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="#blog" onClick={() => setNavbar(!navbar)}>
                Contact Us
                </Link>
            </li>
            {/* <li className="pb-6 text-xl text-white-600 py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="#contact" onClick={() => setNavbar(!navbar)}>
                Contact
                </Link>
            </li> */}
            {/* <li className="pb-6 text-xl text-white-600 py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="#projects" onClick={() => setNavbar(!navbar)}>
                Projects
                </Link>
            </li> */}

            <li className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                <Link href="#getstarted" onClick={() => setNavbar(!navbar)}>
                Your Profile
                </Link>
            </li>



            </ul>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBars;