// https://github.com/vercel/next.js/issues/58272
import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { getCachedProjectBySlug } from "@/rsc-data/user/projects";
import { projectSlugParamSchema } from "@/utils/zod-schemas/params";

async function Title({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 capitalize">
      <T.P>{title} Project</T.P>
    </div>
  );
}

export default async function ProjectNavbar(props: {
  params: Promise<unknown>;
}) {
  const params = await props.params;
  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getCachedProjectBySlug(projectSlug);
  return (
    <div className="flex items-center">
      <Link href={`/project/${project.slug}`}>
        <span className="flex items-center space-x-2">
          <Title title={project.name} />
        </span>
      </Link>
    </div>
  );
}
