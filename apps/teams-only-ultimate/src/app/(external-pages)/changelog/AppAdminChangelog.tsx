import { TiptapJSONContentToHTML } from "@/components/TiptapJSONContentToHTML";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Tables } from "@/lib/database.types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { formatDistance } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  changelogs: Tables<"marketing_changelog">[];
};

export const ChangelogPosts = ({ changelogs }: Props) => {
  return (
    <>
      {changelogs.map((changelog, index) => (
        <div
          key={changelog.id}
          className="grid-cols-5 grid gap-4 mx-auto md:p-8 max-w-5xl"
        >
          <div className="flex flex-col mb-8 col-span-1 gap-2">
            {changelog.created_at ? (
              <div className="md:flex items-center">
                <CalendarDaysIcon className="text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground w-fit">
                  {formatDistance(new Date(changelog.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            ) : null}
            {index === 0 && <Badge className="mr-2 p-2 px-4 w-fit">NEW</Badge>}
          </div>
          <div className="mb-8 space-y-4 col-span-4">
            {changelog.cover_image && (
              <div className="bg-black rounded-lg 2xl:py-12 2xl:px-2">
                <div className="w-full max-w-4xl mx-auto">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={changelog.cover_image}
                      alt="Changelog cover image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </AspectRatio>
                </div>
              </div>
            )}
            <h1 className="text-2xl font-bold">{changelog.title}</h1>
            <div className="max-w-(--breakpoint-lg)">
              <TiptapJSONContentToHTML jsonContent={changelog.json_content} />
            </div>
            <Separator />
          </div>
        </div>
      ))}
    </>
  );
};
