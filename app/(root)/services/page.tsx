"use client";

import NavBar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { ServicesPageCards, ServicesWeCantProvide } from "@/lib/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();

  return (
    <div
      className={` ${
        pathname === "/"
          ? "navbar_with_image"
          : "navbar bg-white opacity-100 mb-20"
      } `}
    >
      <NavBar />
      <div className="flex flex-col justify-center items-center bg-white text-blue-egg-dark mt-16 px-4 md:px-0">
        <p className="text-3xl md:text-4xl font-bold mb-8 text-blue-egg-dark text-center">
          What Doc Poc Can Do?
        </p>
        <div className="flex flex-col md:flex-row mx-auto max-w-7xl justify-center items-center">
          {ServicesPageCards.map((card) => {
            return (
              <div
                key={card.id}
                className="homepage_card m-4 flex flex-col justify-center items-center"
              >
                <Image
                  src={`/assets/icons/${card.icon}`}
                  width={48}
                  height={48}
                  alt={card.header}
                  className="-mt-8 mb-4"
                />
                <p className="text-lg md:text-xl font-semibold text-center text-heading3-chat-with-doctor">
                  {card.header}
                </p>
                <p className="text-sm md:text-base text-center text-heading3-chat-with-doctor">
                  {card.description}
                </p>
              </div>
            );
          })}
          <Image
            src={"/assets/icons/Group 27.svg"}
            width={500}
            height={500}
            alt="plus_icon"
            className="p-10 border-1 hidden md:block"
          />
        </div>
        <Button className="mt-10 md:mt-20 mb-20 px-8 py-4 cursor-pointer self-center bg-blue-egg-dark text-white text-xl font-semibold capitalize">
          Get Started
        </Button>
        <div className="flex flex-col items-center w-full">
          <p className="text-3xl font-bold mb-8 text-blue-egg-dark text-center">
            Services We Cannot Provide
          </p>
          <div className="bg-blue-50 w-full p-4 md:p-8">
            {ServicesWeCantProvide.map((s, i) => (
              <div key={i} className="flex flex-row justify-start items-center">
                <Image
                  src={"/assets/icons/cantprovide.svg"}
                  width={28}
                  height={28}
                  alt="cant_provide"
                />
                <p className="text-base md:text-lg ml-3 opacity-100 text-blue-egg-dark">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
