import NavBar from "@/components/shared/navbar";
import { SignUp } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { Link } from "lucide-react";
import DisplayDoctors from "@/components/cards/DisplayDoctors";
import { getDoctor } from "@/lib/actions/admin.actions";
// TODO fix the paratmeter type
const Page = async ({ searchParams }: any) => {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 4;

  const data = await getDoctor(perPage, page);
  const totalPages = Math.ceil(data.itemCount / perPage);
  console.log(data);

  const user = await currentUser();
  return (
    <>
      <h1 className="text-white text-3xl">Find Your Doctor Now</h1>
      <div className="flex flex-row space-y-6 items-center">
        {" "}
        {/* Flex container with column layout */}
        {data.items.map((item) => (
          <DisplayDoctors
            key={item.id}
            id={item.id}
            bio={item.bio}
            image={item.image}
            name={item.name}
            speciality={item.speciality}
          />
        ))}
      </div>
    </>
  );
};
export default Page;
