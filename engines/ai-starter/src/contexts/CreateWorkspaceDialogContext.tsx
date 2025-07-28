"use client";
import { CreateWorkspaceDialog } from "@/components/CreateWorkspaceDialog";
import { useSafeShortcut } from "@/hooks/useSafeShortcut";
import { createContext, useContext, useState } from "react";

interface CreateWorkspaceDialogContextType {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const CreateWorkspaceDialogContext = createContext<
  CreateWorkspaceDialogContextType | undefined
>(undefined);

export function CreateWorkspaceDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const toggleDialog = () => setIsDialogOpen((isOpen) => !isOpen);

  useSafeShortcut("w", (event) => {
    console.log(event.target);
    event.preventDefault();
    event.stopPropagation();
    toggleDialog();
  });

  return (
    <CreateWorkspaceDialogContext.Provider
      value={{ isDialogOpen, openDialog, closeDialog }}
    >
      {children}
      <CreateWorkspaceDialog />
    </CreateWorkspaceDialogContext.Provider>
  );
}

export function useCreateWorkspaceDialog() {
  const context = useContext(CreateWorkspaceDialogContext);
  if (context === undefined) {
    throw new Error(
      "useCreateWorkspaceDialog must be used within a CreateWorkspaceDialogProvider",
    );
  }
  return context;
}
