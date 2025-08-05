"use client";
import { PHProvider } from "@/contexts/PostHogProvider";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider, useTheme } from "next-themes";
import dynamic from "next/dynamic";
import type React from "react";
import { Suspense } from "react";
import { Toaster as SonnerToaster } from "sonner";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

function CustomerToaster() {
  const theme = useTheme();
  const currentTheme = theme.theme === "light" ? "light" : "dark";
  return <SonnerToaster richColors theme={currentTheme} />;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

/**
 * This is a wrapper for the app that provides the supabase client, the router event wrapper
 * the react-query client, supabase listener, and the navigation progress bar.
 *
 * The listener is used to listen for changes to the user's session and update the UI accordingly.
 */
export function AppProviders({

  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;

}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <PHProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}

          <Suspense>
            <ProgressBar
              height="4px"
              color="#0047ab"
              options={{ showSpinner: false }}
              shallowRouting
            />
            <CustomerToaster />
            <PostHogPageView />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </PHProvider>
  );
}
