"use server";

import {
  fetchSlimWorkspaces,
  getLoggedInUserWorkspaceRole,
  getMaybeDefaultWorkspace,
  getSoloWorkspace,
  getWorkspaceById,
  getWorkspaceBySlug,
} from "@/data/user/workspaces";
import { cache } from "react";

export const getCachedWorkspaceBySlug = cache(getWorkspaceBySlug);

export const getCachedLoggedInUserWorkspaceRole = cache(
  getLoggedInUserWorkspaceRole,
);

export const getCachedDefaultWorkspace = cache(getMaybeDefaultWorkspace);

export const getCachedSoloWorkspace = cache(getSoloWorkspace);

export const getCachedSlimWorkspaces = cache(fetchSlimWorkspaces);

export const getCachedWorkspaceById = cache(getWorkspaceById);
