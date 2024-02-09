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
      <div className="flex flex-col justify-center items-center bg-white text-blue-egg-dark mt-16">
        <p className="text-heading3-bold text-blue-egg-dark text-center">
          What Doc Poc Can Do?
        </p>
        <div className="flex flex-row mx-10 mt-10 justify-evenly">
          {ServicesPageCards.map((card) => {
            return (
              <div
                key={card.id}
                className="homepage_card m-2 flex flex-col justify-center px-5 rotate-2"
              >
                <Image
                  src={`/assets/icons/${card.icon}`}
                  width={48}
                  height={48}
                  alt={card.header}
                  className="self-end -mt-8"
                />
                <p className="text-center text-heading3-chat-with-doctor">
                  {card.header}
                </p>
                <p className="text-center text-heading-3">{card.description}</p>
              </div>
            );
          })}
          <Image
            src={"/assets/icons/Group 27.svg"}
            width={500}
            height={500}
            alt="plus_icon"
            className="mx-20 p-10 border-1"
          />
        </div>
        <Button className="mt-20 mb-20 px-16 py-8 cursor-pointer self-center bg-blue-egg-dark text-white min-w-min w-5 text-2xl capitalize">
          Get Started
        </Button>
        <div className="flex flex-col">
          <p className="text-heading3-chat-with-doctor mb-10">
            Services We Cannot Provide
          </p>
          <div>
            {ServicesWeCantProvide.map((s, i) => (
              <div key={i} className="flex flex-row justify-start">
                <Image
                  src={"/assets/icons/cantprovide.svg"}
                  width={28}
                  height={28}
                  alt="cant_provide"
                />
                <p className="text-heading2-paragraph ml-5">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
