// UserNav.tsx
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";

export async function UserNav() {
  const user = await serverGetLoggedInUser();
  const { email } = user;
  if (!email) {
    throw new Error("User email not found");
  }

  return <div className="flex items-center space-x-4"></div>;
}
