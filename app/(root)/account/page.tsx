
import { currentUser, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

 function Account() {
    redirect("/sign-in");
  
}
export default Account;