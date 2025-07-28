import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, startOfMonth } from "date-fns";
import { useOnboarding } from "./OnboardingContext";

export function TermsAcceptance() {
  const { acceptTermsActionState } = useOnboarding();

  return (
    <>
      <CardHeader>
        <CardTitle
          data-testid="terms-acceptance-title"
          className="text-2xl font-bold mb-2"
        >
          Welcome to Nextbase Ultimate Demo
        </CardTitle>
        <CardDescription>
          Please review our terms of service before proceeding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Last updated: {format(startOfMonth(new Date()), "MMMM d, yyyy")}
          </p>
          <div className="max-h-40 overflow-y-auto text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              auctor, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, nec
              tincidunt nunc nunc id nunc. Sed euismod, nunc id aliquam
              tincidunt, nisl nunc tincidunt nunc, nec tincidunt nunc nunc id
              nunc.
            </p>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Donec velit neque, auctor sit amet aliquam
              vel, ullamcorper sit amet ligula. Proin eget tortor risus.
            </p>
            <p>
              Curabitur aliquet quam id dui posuere blandit. Curabitur arcu
              erat, accumsan id imperdiet et, porttitor at sem. Vivamus magna
              justo, lacinia eget consectetur sed, convallis at tellus.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          data-testid="accept-terms-button"
          onClick={() => acceptTermsActionState.execute()}
          disabled={acceptTermsActionState.status === "executing"}
          className="w-full"
        >
          {acceptTermsActionState.status === "executing"
            ? "Accepting..."
            : "Accept Terms"}
        </Button>
      </CardFooter>
    </>
  );
}
