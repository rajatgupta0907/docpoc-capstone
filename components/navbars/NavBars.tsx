"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function NavBars() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="flex-row top-0 z-30 flex patient_dashboard_nav w-full items-center justify-between bg-dark-2  py-1">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/patient-dashboard">
                <h2 className="text-2xl  text-white-600 font-bold ">DOC POC</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/assets/images/close.png" width={50} height={50} alt="logo" />
                  ) : (
                    <Image
                      src="/assets/images/menu.png"
                      width={50}
                      height={50}
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
            <li className="pb-6 text-xl text-white-600 py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="/my-prescriptions" onClick={() => setNavbar(!navbar)}>
                Your Prescription
                </Link>
            </li>
            <li className="pb-6 text-xl text-white-600 py-2 px-6 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900">
                <Link href="/patient-contact-us" onClick={() => setNavbar(!navbar)}>
                Contact Us
                </Link>
            </li>
            
            <div className="patient_dashboard_btn">
            <li className="text-xl text-white-600 text-center border-b-2 md:border-b-0 hover:text-gray-750 border-purple-900" >
                <Link href="/onboarding" onClick={() => setNavbar(!navbar)}>
                Your Profile
                </Link>
            </li>
            </div>


            </ul>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBars;