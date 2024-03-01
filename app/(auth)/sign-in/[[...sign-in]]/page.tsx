import { redirect } from "next/navigation";

import NavBar from "@/components/shared/navbar";
import { SignIn, SignUp, currentUser } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import SignInNavbar from "@/components/shared/SignInNavbar";
const Page = async () => {
  const user = await currentUser();
  if (user?.id) return redirect("/patient-dashboard");
  return <SignInNavbar />;
};
export default Page;