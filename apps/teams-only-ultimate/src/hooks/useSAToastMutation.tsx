"use client";
import type { SAPayload, SASuccessPayload } from "@/types";
import {
  useMutation,
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useRef } from "react";
import { useWillUnmount } from "rooks";
import { toast } from "sonner";

type MutationFn<TData, TVariables> = MutationFunction<TData, TVariables>;

interface ToastMutationOptions<TData, TError extends Error, TVariables>
  extends UseMutationOptions<TData, TError, TVariables> {
  loadingMessage?: string | ((variables: TVariables) => string);
  successMessage?: string | ((data: TData, variables: TVariables) => string);
  errorMessage?: string | ((error: TError, variables: TVariables) => string);
}
/**
 * Mutation with toast notifications for Server Action functions
 * Custom React hook that wraps a mutation function with toast notifications for loading, success, and error states.
 * It leverages the `useMutation` hook from `@tanstack/react-query` to perform the mutation operation.
 * This hook enhances user experience by providing immediate visual feedback during the mutation process.
 *
 * @param mutationFn The mutation function to be executed. It should return a promise that resolves to a `ValidSAPayload<TData>`.
 * @param options An optional configuration object that extends `UseMutationOptions` from `@tanstack/react-query` with additional properties:
 *  - `loadingMessage`: A string or a function returning a string to display as a toast message during the loading state.
 *  - `successMessage`: A string or a function returning a string to display as a toast message when the mutation succeeds.
 *  - `errorMessage`: A string or a function returning a string to display as a toast message when the mutation fails.
 * These messages can be dynamic based on the mutation's variables or the response/error data.
 *
 * @returns A `UseMutationResult` object with properties and methods to control and interact with the mutation state.
 *
 * Usage of this hook simplifies the process of providing feedback to the user during data mutations, handling loading, success, and error states with customizable toast messages.
 */
export function useSAToastMutation<
  TData = unknown,
  TError extends Error = Error,
  TVariables = void,
>(
  mutationFn: MutationFn<SAPayload<TData>, TVariables>,
  options?: Omit<
    ToastMutationOptions<SAPayload<TData>, TError, TVariables>,
    "onSuccess" | "onError"
  > & {
    onSuccess?: (
      data: SASuccessPayload<TData>,
      variables: TVariables,
      context: unknown,
    ) => void;
    onError?: (error: Error, variables: TVariables, context: unknown) => void;
    dismissOnSuccess?: boolean;
    dismissOnError?: boolean;
  },
): UseMutationResult<SAPayload<TData>, TError, TVariables> {
  const toastIdRef = useRef<string | number | null>(null);

  useWillUnmount(() => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }
  });

  return useMutation<SAPayload<TData>, TError, TVariables>({
    ...options,
    mutationFn,
    onMutate: async (variables) => {
      const loadingMessage = options?.loadingMessage
        ? typeof options.loadingMessage === "function"
          ? options.loadingMessage(variables)
          : options.loadingMessage
        : "Loading...";

      toastIdRef.current = toast.loading(loadingMessage);
      if (options?.onMutate) {
        await options.onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      // router.refresh();
      const isHandledError = data.status === "error";
      // error scenario
      if (isHandledError) {
        throw new Error(data.message);
      }
      if (options?.dismissOnSuccess && toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      } else {
        // success scenario
        const successMessage = options?.successMessage
          ? typeof options.successMessage === "function"
            ? options.successMessage(data, variables)
            : options.successMessage
          : "Success!";
        toast.success(successMessage, {
          id: toastIdRef.current ?? undefined,
          dismissible: true,
        });
      }
      toastIdRef.current = null;

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      const errorMessage = options?.errorMessage
        ? typeof options.errorMessage === "function"
          ? options.errorMessage(error, variables)
          : options.errorMessage
        : "Error!";
      console.warn("[useSAToastMutation]", errorMessage);
      toast.error(errorMessage, {
        id: toastIdRef.current ?? undefined,
        dismissible: true,
      });
      toastIdRef.current = null;
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
  });
}
