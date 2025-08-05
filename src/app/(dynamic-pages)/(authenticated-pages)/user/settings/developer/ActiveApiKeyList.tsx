import { PageHeading } from "@/components/PageHeading";
import { T } from "@/components/ui/Typography";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getActiveDeveloperKeys } from "@/data/user/unkey";
import { format } from "date-fns";
import moment from "moment";
import { ConfirmRevokeTokenDialog } from "./ConfirmRevokeTokenDialog";

export async function ActiveApiKeyList() {
  const activeDeveloperKeys = await getActiveDeveloperKeys();
  const heading = (
    <PageHeading
      title="Active API Keys"
      titleClassName="text-lg"
      subTitle="Below is the list of your API keys with their details. You can use your API keys to access the platform programmatically. Eg: Zapier, Integromat, Make etc."
    />
  );

  if (activeDeveloperKeys.length) {
    return (
      <div className="space-y-8 max-w-4xl">
        {heading}
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">API Key</TableHead>
              <TableHead className="w-[140px]">Generated On</TableHead>
              <TableHead className="w-[140px]">Expires In</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeDeveloperKeys.map((apiKey) => {
              return (
                <TableRow key={apiKey.key_id}>
                  <TableCell className="font-medium">
                    {apiKey.masked_key}
                  </TableCell>
                  <TableCell className="font-medium">
                    {format(new Date(apiKey.created_at), "PPP")}
                  </TableCell>

                  <TableCell>
                    {apiKey.expires_at
                      ? moment(apiKey.expires_at).format("LL")
                      : "No expiry"}
                  </TableCell>
                  <TableCell>
                    <ConfirmRevokeTokenDialog keyId={apiKey.key_id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    );
  } else {
    return (
      <div className=" max-w-sm">
        {heading}
        <T.Subtle>No active API keys.</T.Subtle>
      </div>
    );
  }
}
