import { getCachedUserProfile } from "@/rsc-data/user/user";
import { getUserAvatarUrl } from "@/utils/helpers";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import {
  BadgeCheck,
  ChevronsUpDown,
  Code,
  FileQuestion,
  History,
  LogOut,
  Shield,
} from "lucide-react";
import { Suspense } from "react";
import { Link } from "./intl-link";
import { NotificationsDropdownMenuTrigger } from "./notifications-dropdown-menu-trigger";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";
import { UnseenNotificationCounterBadge } from "./unseen-notification-counter-badge";
async function SidebarFooterUserMenu() {
  const [data, user] = await Promise.all([
    getCachedUserProfile(),
    serverGetLoggedInUserVerified(),
  ]);
  const avatarImage = getUserAvatarUrl({
    email: user.email,
    profileAvatarUrl: data.avatar_url,
  });
  return (
    <SidebarMenu data-testid="sidebar-user-nav-menu">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              data-testid="sidebar-user-nav-avatar-button"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={avatarImage}
                  alt={data.full_name ?? user.email}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {data.full_name ?? user.email}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <UnseenNotificationCounterBadge />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={avatarImage}
                    alt={data.full_name ?? user.email}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data.full_name ?? user.email}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <NotificationsDropdownMenuTrigger />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/user/settings">
                  <BadgeCheck />
                  Account Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/settings/security">
                  <Shield />
                  Security Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/settings/developer">
                  <Code />
                  Developer Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/feedback">
                  <FileQuestion />
                  Feedback
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/changelog">
                  <History />
                  Changelog
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ThemeToggle />
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/logout">
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export async function SidebarFooterUserNav() {
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <SidebarFooterUserMenu />
    </Suspense>
  );
}
