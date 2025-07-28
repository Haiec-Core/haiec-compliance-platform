import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { redirect } from "next/navigation";
import { UpdatePassword } from "./UpdatePassword";

export default async function UpdatePasswordPage() {
  try {
    await serverGetLoggedInUserVerified();
  } catch (error) {
    console.error(error);
    return redirect("/login");
  }
  return <UpdatePassword />;
}
