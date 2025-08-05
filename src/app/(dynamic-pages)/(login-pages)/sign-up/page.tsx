import { Metadata } from "next";
import { z } from "zod";
import { SignUp } from "./Signup";

const SearchParamsSchema = z.object({
  next: z.string().optional(),
  nextActionType: z.string().optional(),
});

export const metadata: Metadata = {
  title: "Sign Up | Nextbase Starter Kits Demo",
  description:
    "Create an account to get started with Nextbase Starter Kits Demo",
};

export default async function SignUpPage(props: {
  searchParams: Promise<unknown>;
}) {
  const searchParams = await props.searchParams;
  const { next, nextActionType } = SearchParamsSchema.parse(searchParams);
  return <SignUp next={next} nextActionType={nextActionType} />;
}
