"use client";
import { CreateWorkspaceDialog } from "@/components/CreateWorkspaceDialog";
import { useSafeShortcut } from "@/hooks/useSafeShortcut";
import { createContext, useContext, useState } from "react";

/**
 * Context type for managing the state of the Create Workspace Dialog.
 */
interface CreateWorkspaceDialogContextType {
  /**
   * Indicates if the dialog is currently open.
   */
  isDialogOpen: boolean;
  /**
   * Function to open the dialog.
   */
  openDialog: () => void;
  /**
   * Function to close the dialog.
   */
  closeDialog: () => void;
}

/**
 * Context for the Create Workspace Dialog, providing state and actions.
 */
const CreateWorkspaceDialogContext = createContext<
  CreateWorkspaceDialogContextType | undefined
>(undefined);

/**
 * Provider component for the Create Workspace Dialog context.
 *
 * @param children - The child components that will have access to the context.
 * @returns The provider component wrapping the children.
 */
export function CreateWorkspaceDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /**
   * Opens the dialog by setting isDialogOpen to true.
   */
  const openDialog = () => setIsDialogOpen(true);
  /**
   * Closes the dialog by setting isDialogOpen to false.
   */
  const closeDialog = () => setIsDialogOpen(false);
  /**
   * Toggles the dialog open state.
   */
  const toggleDialog = () => setIsDialogOpen((isOpen) => !isOpen);

  // Use a safe keyboard shortcut to toggle the dialog
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

/**
 * Custom hook to use the Create Workspace Dialog context.
 *
 * @returns The context value containing dialog state and actions.
 * @throws Error if used outside of CreateWorkspaceDialogProvider.
 */
export function useCreateWorkspaceDialog() {
  const context = useContext(CreateWorkspaceDialogContext);
  if (context === undefined) {
    throw new Error(
      "useCreateWorkspaceDialog must be used within a CreateWorkspaceDialogProvider",
    );
  }
  return context;
}
