import { HeartIcon, MessageCircleIcon, UploadIcon } from "lucide-react";
import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

type Props = {
  children: React.ReactNode;
};

export const PostTweetWrapper = ({ children }: Props) => {
  return (
    <Card className="p-4 max-w-md">
      <div className="flex items-center space-x-2 mb-4">
        <Avatar>
          <AvatarImage
            alt="User avatar"
            src="/placeholder.svg?height=40&width=40"
          />
          <AvatarFallback>E.G</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm">@username</div>
          <div className="text-xs text-muted-foreground">
            {new Date().toLocaleString()}
          </div>
        </div>
      </div>
      <div className="text-sm mb-4">{children}</div>
      <div className="flex items-center justify-between text-sm px-8">
        <MessageCircleIcon className="size-4 text-muted-foreground hover:text-foreground" />

        <HeartIcon className="size-4 text-muted-foreground hover:text-foreground" />

        <UploadIcon className="size-4 text-muted-foreground hover:text-foreground" />
      </div>
    </Card>
  );
};
