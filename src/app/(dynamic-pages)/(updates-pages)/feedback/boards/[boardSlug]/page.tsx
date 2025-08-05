import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { userRoles } from "@/utils/userTypes";
import { Suspense } from "react";
import { filtersSchema } from "../../[feedbackId]/schema";
import { AdminBoardDetail } from "./AdminBoardDetail";
import { AnonBoardDetail } from "./AnonBoardDetail";
import { BoardDetailFallback } from "./BoardDetailFallback";
import { LoggedInUserBoardDetail } from "./LoggedInUserBoardDetail";

async function BoardDetailPage(props: {
  params: Promise<{ boardSlug: string }>;
  searchParams: Promise<unknown>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const validatedSearchParams = filtersSchema.parse(searchParams);
  const userRoleType = await serverGetUserType();
  const { boardSlug } = params;
  const suspenseKey = JSON.stringify(validatedSearchParams);

  return (
    <div className="py-6">
      <Suspense key={suspenseKey} fallback={<BoardDetailFallback />}>
        {userRoleType === userRoles.ANON && (
          <AnonBoardDetail
            boardSlug={boardSlug}
            filters={validatedSearchParams}
          />
        )}
        {userRoleType === userRoles.USER && (
          <LoggedInUserBoardDetail
            boardSlug={boardSlug}
            filters={validatedSearchParams}
          />
        )}
        {userRoleType === userRoles.ADMIN && (
          <AdminBoardDetail
            boardSlug={boardSlug}
            filters={validatedSearchParams}
          />
        )}
      </Suspense>
    </div>
  );
}

export default BoardDetailPage;
