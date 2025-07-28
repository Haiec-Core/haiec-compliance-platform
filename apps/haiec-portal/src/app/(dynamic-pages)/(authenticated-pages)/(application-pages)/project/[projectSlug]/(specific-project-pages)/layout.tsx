import { ApplicationLayoutShell } from "@/components/ApplicationLayoutShell";
import { InternalNavbar } from "@/components/NavigationMenu/InternalNavbar";
import { PageHeading } from "@/components/PageHeading";
import { getCachedProjectBySlug } from "@/rsc-data/user/projects";
import { projectSlugParamSchema } from "@/utils/zod-schemas/params";
import { Suspense, type ReactNode } from "react";
import { ApprovalControls } from "./ApprovalControls";
import { ProjectCommentsSheet } from "./ProjectCommentsSheet";

async function ProjectPageHeading({
  projectSlug,
  title,
}: {
  projectSlug: string;
  title: string;
}) {
  const project = await getCachedProjectBySlug(projectSlug);
  return (
    <PageHeading
      title={title}
      actions={
        <Suspense>
          <div className="flex space-x-4">
            <ApprovalControls projectSlug={projectSlug} />
            <ProjectCommentsSheet
              projectId={project.id}
              projectSlug={projectSlug}
            />
          </div>
        </Suspense>
      }
    />
  );
}

export default async function ProjectLayout(props: {
  children: ReactNode;
  params: Promise<unknown>;
  navbar: ReactNode;
  sidebar: ReactNode;
}) {
  const params = await props.params;

  const { children, navbar, sidebar } = props;

  const { projectSlug } = projectSlugParamSchema.parse(params);
  const project = await getCachedProjectBySlug(projectSlug);
  return (
    <ApplicationLayoutShell sidebar={sidebar}>
      <div>
        <InternalNavbar>
          <div className="flex w-full justify-between items-center">
            <Suspense>{navbar}</Suspense>
          </div>
        </InternalNavbar>
        <div className="space-y-8 m-6 container w-full mx-auto">
          <div className="space-y-0 ">
            <Suspense>
              <ProjectPageHeading
                projectSlug={projectSlug}
                title={project.name}
              />
            </Suspense>
          </div>
          {children}
        </div>
      </div>
    </ApplicationLayoutShell>
  );
}
