
import { currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Account() {
  const user = await currentUser();
  if (user) {
  } else {
    redirect("/sign-in");
  }
}
export default Account;
