import { T } from "@/components/ui/Typography";
import { getSlimProjectBySlug } from "@/data/user/projects";
import { projectSlugParamSchema } from "@/utils/zod-schemas/params";

export default async function ProjectSettings(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getSlimProjectBySlug(projectSlug);
  return (
    <div className="space-y-2">
      <T.H3>Project Settings</T.H3>
      <T.Subtle>
        Add settings for your projects depending on your usecase
      </T.Subtle>
    </div>
  );
}
