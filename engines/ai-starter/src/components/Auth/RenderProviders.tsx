import * as SocialIcons from "@/components/Auth/Icons";
import { Button } from "@/components/ui/button";
import { SocialProvider } from "@/utils/zod-schemas/social-providers";
import { Fragment } from "react";

function capitalize(word: string) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export const RenderProviders = ({
  providers,
  onProviderLoginRequested,
  isLoading,
}: {
  providers: SocialProvider[];
  onProviderLoginRequested: (provider: SocialProvider) => void;
  isLoading: boolean;
}) => {
  return (
    <div className="flex justify-between">
      {providers.map((provider) => {
        const AuthIcon = SocialIcons[provider];

        return (
          <Fragment key={provider}>
            <Button
              variant="outline"
              size="default"
              disabled={isLoading}
              onClick={() => onProviderLoginRequested(provider)}
              className="bg-background text-foreground border h-10 border-input rounded-lg"
            >
              <div className="mr-2">
                <AuthIcon />
              </div>
              <span className="">{capitalize(provider)}</span>
            </Button>
          </Fragment>
        );
      })}
    </div>
  );
};
