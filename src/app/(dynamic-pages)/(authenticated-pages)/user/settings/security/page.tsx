import { PageHeading } from "@/components/PageHeading";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { UpdateEmail } from "./UpdateEmail";
import { UpdatePassword } from "./UpdatePassword";

export default async function SecuritySettings() {
  const user = await serverGetLoggedInUserVerified();
  return (
    <div className="space-y-8 max-w-sm">
      <PageHeading
        title="Security Settings"
        titleClassName="text-xl"
        subTitleClassName="text-base -mt-1"
        subTitle="Manage your login credentials here."
      />
      <div className="space-y-24">
        <UpdateEmail initialEmail={user.email} />
        <UpdatePassword />
      </div>
    </div>
  );
}
