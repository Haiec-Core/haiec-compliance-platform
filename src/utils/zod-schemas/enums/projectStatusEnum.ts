import { Enum } from "@/types";
import { z } from "zod";

export const projectStatusEnum = z.enum([
  "draft",
  "pending_approval",
  "approved",
  "completed",
]);

export type ProjectStatusEnum = z.infer<typeof projectStatusEnum>;
type DBProjectStatusEnum = Enum<"project_status">;

type ProjectStatusEnumEquivalence =
  ProjectStatusEnum extends DBProjectStatusEnum
  ? DBProjectStatusEnum extends ProjectStatusEnum
  ? true
  : false
  : false;

type AssertProjectStatusEnumEquivalence =
  ProjectStatusEnumEquivalence extends true ? true : never;

const _assertProjectStatusEnumEquivalence: AssertProjectStatusEnumEquivalence =
  true;
