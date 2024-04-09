"use client";
import NavBar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { OurMission } from "@/lib/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  return (
    <div className={` ${pathname === "/" ? "navbar_with_image" : "navbar bg-white opacity-100 mb-20 h-auto"} `}>
      <NavBar />
      <div className="text-blue-egg-dark flex flex-col px-4 mt-10 bg-white">
        <div className="flex flex-col justify-center align-middle items-center">
          <p className="text-2xl md:text-4xl font-bold text-center">About Us at DocPoc</p>
          <p className="text-black px-4 mt-4 md:mt-6 text-lg md:text-xl text-center">
            Welcome to DocPoc - "A Doctor in Your Pocket." We are an innovative online consultancy platform designed to revolutionize the way healthcare is accessed and delivered. At DocPoc, we believe that quality healthcare should be a right, not a privilege, accessible anytime and anywhere. Our mission is to bridge the gap between healthcare professionals and patients through a seamless, secure, and user-friendly online environment.
          </p>
        </div>
        <div className="mt-8">
          <div className="flex flex-col">
            <p className="text-2xl md:text-4xl font-bold text-center">Our Vision</p>
            <p className="text-black px-4 mt-4 md:mt-6 text-lg md:text-xl text-center">
              To be the leading online healthcare consultancy platform that empowers individuals to take control of their health by providing expert, accessible, and personalized medical advice at their fingertips.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-2xl md:text-4xl font-bold text-center mb-1">Our Mission</p>
            {OurMission.map((o, i) => {
              return (
                <div key={i} className="flex flex-row text-black justify-center md:justify-start">
                  <p className="font-bold">{o.boldText}</p>
                  <p className="font-semibold">{o.description}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-black flex flex-col bg-blue-100">
            <p className="p-4 mt-4 md:mt-10 text-2xl md:text-4xl font-bold text-center">What We Offer</p>
            <p className="px-4 md:px-10 font-semibold text-lg md:text-xl text-center">
              DocPoc offers a wide range of services that cater to your health and wellness needs. Our platform connects you with a diverse pool of medical specialists and healthcare providers across various disciplines, ensuring you receive the right consultation, diagnosis, and treatment plan. From general health questions to specialized medical advice, mental health support, and chronic disease management, DocPoc is here to support your journey to better health.
            </p>
            <Button className="mt-8 md:mt-12 mb-10 md:mb-20 px-8 py-4 cursor-pointer self-center bg-blue-egg-dark text-white text-xl font-semibold capitalize">Know More</Button>
          </div>
          <div className="mt-8 flex flex-col text-black">
            <p className="text-2xl md:text-4xl font-bold text-center">Our Team</p>
            <p className="my-4 md:my-10 px-4 md:px-10 font-semibold text-lg md:text-xl text-center">
              Behind DocPoc is a team of dedicated professionals, including doctors, healthcare practitioners, technologists, and customer service experts, all committed to providing a supportive, empathetic, and high-quality online healthcare experience. Our team is constantly expanding, bringing on board specialists in emerging fields to ensure our community receives comprehensive care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
