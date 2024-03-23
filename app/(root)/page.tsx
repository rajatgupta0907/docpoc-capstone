"use client";
import HomePageCard from "@/components/shared/homepageCard";
import NavBar from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { HomePageCardContent } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { Bungee } from "next/font/google";
const bungee = Bungee({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})
export default function Home() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-start capitalize opacity-100">
      <div
        className={`flex flex-col ${
          pathname === "/" ? "navbar_with_image bg-black" : "navbar"
        }`}
      >
        <div className="flex-[2] w-4/4 !opacity-100">
          <NavBar />
        </div>
        <section className="flex-[9] flex justify-center items-start flex-col align-center w-4/4 mx-60 mt-20">
          <p className="text-heading3-chat-with-doctor mobile:text-black">
            Doctor In Your Pocket
          </p>
          <p className="text-heading2-paragraph">
            your trusted companion in health care
          </p>
          <p className="text-heading2-paragraph">
            where a doctor is always within reach, right in your pocket!
          </p>
          <Button className="mt-60 px-16 py-8 cursor-pointer self-center bg-blue-egg-dark text-white min-w-min w-5 text-2xl capitalize">
            Chat with a doctor
          </Button>
        </section>
      </div>
      <section className="flex flex-col w-full justify-start items-center bg-white text-blue-egg">
        <p className="text-heading3-bold mt-4">How It works</p>
        <p className="text-heading3-chat-with-doctor mb-16">
          In 3 simple steps
        </p>
        <div className="flex flex-row justify-evenly w-full">
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
        <Button className="mt-20 mb-20 px-16 py-8 cursor-pointer self-center bg-blue-egg-dark text-white min-w-min w-5 text-2xl capitalize">
          Get Started
        </Button>
      </section>
      <section className="pt-10 flex flex-col w-full justify-start items-center bg-blue-egg-dark text-white">
        <p className="text-heading3-bold">What our patients think of us</p>
        <div>
          <p className={`${bungee.className} text-card-heading px-10 rotate-180 text-end`}>,,</p>
          <p className={`text-center text-heading2-bold px-20`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos porro illum temporibus, dolore, quidem nulla provident rerum itaque est sint aperiam deleniti aliquam esse maiores perspiciatis rem tenetur optio velit!</p>
          <p className={`${bungee.className} text-card-heading text-end pr-16`}>,,</p>
        </div>
      </section>
    </div>
  );
}
