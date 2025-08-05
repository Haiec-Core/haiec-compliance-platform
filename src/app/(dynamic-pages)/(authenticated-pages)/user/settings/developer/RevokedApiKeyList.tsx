import { PageHeading } from "@/components/PageHeading";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRevokedApiKeyList } from "@/data/user/unkey";
import { format } from "date-fns";

export async function RevokedApiKeyList() {
  const revokedApiKeyList = await getRevokedApiKeyList();

  if (!revokedApiKeyList.length) {
    return <p>No revoked keys</p>;
  }

  const heading = (
    <PageHeading
      title="Revoked API Keys"
      subTitle="Below is the list of your revoked API keys with their details."
      titleClassName="text-lg"
    />
  );

  return (
    <div className="space-y-8 max-w-4xl">
      {heading}
      <div className="space-y-2">
        <ShadcnTable>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">API Key</TableHead>
              <TableHead className="w-[140px]">Generated On</TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revokedApiKeyList.map((apiKey) => {
              return (
                <TableRow key={apiKey.key_id}>
                  <TableCell className="font-medium">
                    {apiKey.masked_key}
                  </TableCell>
                  <TableCell>
                    {format(new Date(apiKey.created_at), "PPP")}
                  </TableCell>
                  <TableCell>Revoked</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
}
