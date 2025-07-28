"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/Typography";
import { SlimWorkspace } from "@/types";
import {
  BookOpen,
  DollarSign,
  FileText,
  GitBranch,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { CreateWorkspaceButton } from "./create-workspace-button";
import { Link } from "./intl-link";
import { SimpleImageCarousel } from "./simple-image-carousel";
import { Button } from "./ui/button";

function CreateTeamWorkspaceDialog({
  workspace,
}: {
  workspace: SlimWorkspace;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Users className="h-4 w-4" />
            <span>1. Create a Team Workspace</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Nextbase Ultimate supports Solo and Team workspaces
          </DialogTitle>
          <DialogDescription>
            Create a team workspace to collaborate with your team members.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Typography.Subtle>
            By default, Nextbase Ultimate creates a Solo workspace for users
            after they first onboard.
          </Typography.Subtle>
          <Typography.Subtle>
            However you can create a Team workspace by clicking the button below
            or pressing the shortcut{" "}
            <strong>
              <kbd>w</kbd>
            </strong>
            .
          </Typography.Subtle>
        </div>
        <CreateWorkspaceButton onClick={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function InviteUsersDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Mail className="h-4 w-4" />
            <span>2. Invite users to team</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Invite users to your team workspace
          </DialogTitle>
          <DialogDescription>
            Invite users to your team workspace, assign privileges and
            collaborate together.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <SimpleImageCarousel
            images={[
              {
                src: "/images/tips/members.jpg",
                alt: "A team workspace can have multiple members. Workspace admins can invite users to the workspace.",
              },
              {
                src: "/images/tips/invite.jpg",
                alt: "Invite users to your team worksapce, assign privileges and collaborate together.",
              },
            ]}
          />
        </div>
        <DialogClose asChild>
          <Button variant="default">Got it!</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function AdminUserDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <GitBranch className="h-4 w-4" />
            <span>3. Make an Application Admin User</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Nextbase Ultimates ships with an Admin panel
          </DialogTitle>
          <DialogDescription>
            Discover the process of assigning admin privileges to users in your
            application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <SimpleImageCarousel
            images={[
              {
                src: "/images/tips/admin-panel.jpg",
                alt: "Assign admin privileges to users in your application.",
              },
              {
                src: "/images/tips/admin-payments.jpg",
                alt: "Manage Stripe products and their visibility to your users.",
              },
              {
                src: "/images/tips/admin-payments-2.jpg",
                alt: "View awesome Stripe payments and metrics.",
              },
            ]}
          />
        </div>
        <Button variant="default" asChild>
          <Link
            target="_blank"
            href="https://usenextbase.com/docs/v3/admin-panel/make-user-app-admin"
          >
            How to make a user an app admin?
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function ConnectStripeDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <DollarSign className="h-4 w-4" />
            <span>4. Connect Stripe</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Connect Stripe and collect payments!
          </DialogTitle>
          <DialogDescription>
            Set up Stripe integration for seamless payment processing in your
            application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <SimpleImageCarousel
            images={[
              {
                src: "/images/tips/admin-sync-payments.jpg",
                alt: "Sync payments from Stripe to your application.",
              },
              {
                src: "/images/tips/stripe-developers.jpg",
                alt: "Configure stripe webhooks",
              },
              {
                src: "/images/tips/workspace-billing-stripe-products-visible.jpg",
                alt: "Stripe products visible to your users.",
              },
            ]}
          />
          <Button variant="default" asChild>
            <Link
              target="_blank"
              href="https://usenextbase.com/docs/v3/admin-panel/setting-up-payments"
            >
              How to set up Stripe payments?
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdminBlogPostDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <FileText className="h-4 w-4" />
            <span>5. Write an Admin Blog Post</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Share more with your audience with blog posts
          </DialogTitle>
          <DialogDescription>
            Learn how to create and publish blog posts using the admin
            interface.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <SimpleImageCarousel
            images={[
              {
                src: "/images/tips/admin-blog-list.jpg",
                alt: "Manage your blog posts in the admin panel.",
              },
              {
                src: "/images/tips/admin-edit-blog-1.jpg",
                alt: "You can upload images to your blog posts.",
              },
              {
                src: "/images/tips/admin-edit-blog-2.jpg",
                alt: "Markdown editor built-in",
              },
            ]}
          />
        </div>
        <DialogClose asChild>
          <Button variant="default">Got it!</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function WriteDocsArticleDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <BookOpen className="h-4 w-4" />
            <span>6. Write a Docs Article</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Write technical docs for your project
          </DialogTitle>
          <DialogDescription>
            Explore the process of writing and organizing documentation for your
            project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <SimpleImageCarousel
            images={[
              {
                src: "/images/tips/docs-guide.jpg",
                alt: "You can write docs for your project.",
              },
            ]}
          />
          <Button variant="default" asChild>
            <Link
              target="_blank"
              href="https://usenextbase.com/docs/v3/guides/creating-docs-page"
            >
              How to create a docs page?
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MoreFeaturesDialog({ workspace }: { workspace: SlimWorkspace }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Sparkles className="h-4 w-4" />
            <span>7. More Exciting Features</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-lg">
            Discover More Powerful Features
          </DialogTitle>
          <DialogDescription>
            Explore additional admin tools and upcoming AI integrations.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Typography.Small>
              Nextbase Ultimate includes several powerful admin tools to help
              you manage your application:
            </Typography.Small>
            <Typography.List>
              <li>
                <Typography.Subtle>
                  <span className="text-foreground font-semibold">
                    {" "}
                    Admin Changelog:{" "}
                  </span>
                  Keep track of important updates and changes in your
                  application.
                </Typography.Subtle>
              </li>
              <li>
                <Typography.Subtle>
                  <span className="text-foreground font-semibold">
                    Admin Feedback:{" "}
                  </span>
                  Collect and manage user feedback to improve your product.
                </Typography.Subtle>
              </li>
              <li>
                <Typography.Subtle>
                  <span className="text-foreground font-semibold">
                    Admin Roadmap:{" "}
                  </span>
                  Plan and visualize your product&apos;s future developments.
                </Typography.Subtle>
              </li>
            </Typography.List>
          </div>

          <div>
            <Typography.Small>
              More tips for OpenAI integrations coming soon!
            </Typography.Small>
            <Typography.List>
              <li>
                <Typography.Subtle>
                  <span className="text-foreground font-semibold">
                    Text generation
                  </span>{" "}
                  with OpenAI included
                </Typography.Subtle>
              </li>
              <li>
                <Typography.Subtle>
                  <span className="text-foreground font-semibold">
                    Image generation
                  </span>{" "}
                  with DALL-E included
                </Typography.Subtle>
              </li>
            </Typography.List>
            <Typography.Subtle>
              These AI-powered tools will help you create more engaging content
              and enhance user experiences.
            </Typography.Subtle>
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="default">Got it!</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function SidebarTipsNav({ workspace }: { workspace: SlimWorkspace }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Nextbase Tips</SidebarGroupLabel>
      <SidebarMenu>
        <CreateTeamWorkspaceDialog workspace={workspace} />
        <InviteUsersDialog workspace={workspace} />
        <AdminUserDialog workspace={workspace} />
        <ConnectStripeDialog workspace={workspace} />
        <AdminBlogPostDialog workspace={workspace} />
        <WriteDocsArticleDialog workspace={workspace} />
        <MoreFeaturesDialog workspace={workspace} />
      </SidebarMenu>
    </SidebarGroup>
  );
}
