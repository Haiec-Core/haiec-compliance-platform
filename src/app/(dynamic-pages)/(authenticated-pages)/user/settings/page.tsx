import { getUserProfile } from "@/data/user/user";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { AccountSettings } from "./AccountSettings";

export default async function AccountSettingsPage() {
  const user = await serverGetLoggedInUserVerified();
  const userProfile = await getUserProfile(user.id);

  return <AccountSettings userProfile={userProfile} userEmail={user.email} />;
}
