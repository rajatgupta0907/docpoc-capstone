"use client";
import HomePageCard from "@/components/shared/homepageCard";
import NavBar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { HomePageCardContent } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-start capitalize">
      <div
        className={`flex flex-col ${
          pathname === "/" ? "navbar_with_image" : "navbar"
        }`}
      >
        <div className="flex-[2] w-4/4">
          <NavBar />
        </div>
        <section className="flex-[9] !cursor-pointer flex justify-center items-start flex-col align-center w-4/4 mx-60 mt-20">
          <p className="text-heading3-chat-with-doctor">
            Doctor In Your Pocket
          </p>
          <p className="text-heading2-paragraph">
            your trusted companion in health care
          </p>
          <p className="text-heading2-paragraph">
            where a doctor is always within reach, right in your pocket!
          </p>
          <Button className="mt-60 px-16 py-8 cursor-pointer self-center bg-blue-egg text-white min-w-min w-5 text-2xl capitalize">
            Chat with a doctor
          </Button>
        </section>
      </div>
      <section>
        <p>How It works</p>
        <p>In 3 simple steps</p>
        <div>
          {HomePageCardContent.map((card) => {
            return (
              <HomePageCard
                key={card.index}
                image={card.image}
                text={card.text}
                index={card.index}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
