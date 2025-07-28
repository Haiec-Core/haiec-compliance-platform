import { Suspense } from "react";
import { LeftNav } from "../ExternalNavbar/LeftNav";
import { LoginCTAButton } from "../ExternalNavbar/LoginCTAButton";
import { MobileMenu } from "../ExternalNavbar/MobileMenu";
import { MobileMenuProvider } from "../ExternalNavbar/MobileMenuContext";
import { MobileMenuOpen } from "../ExternalNavbar/MobileMenuOpen";

export function PublicNavigation() {
  return (
    <MobileMenuProvider>
      <header className="sticky inset-x-0 w-full top-0 z-50 border-b backdrop-blur-sm">
        <nav
          className="flex items-center w-full h-[54px] md:container justify-between px-6 md:px-8"
          aria-label="Global"
        >
          <LeftNav />
          <div className="flex gap-5">
            <Suspense
              fallback={
                <div className="flex space-x-10 items-center lg:-mr-2" />
              }
            >
              <div className="flex space-x-10 items-center lg:-mr-2">
                {/* <ThemeToggle /> */}
                <div className="ml-6 hidden lg:block" suppressHydrationWarning>
                  <LoginCTAButton />
                </div>
              </div>
            </Suspense>
            <MobileMenuOpen />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </MobileMenuProvider>
  );
}
