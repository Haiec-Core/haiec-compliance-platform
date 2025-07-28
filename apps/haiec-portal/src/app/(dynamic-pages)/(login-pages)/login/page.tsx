import { Metadata } from "next";
import { z } from "zod";
import { Login } from "./Login";

const SearchParamsSchema = z.object({
  next: z.string().optional(),
  nextActionType: z.string().optional(),
});

export const metadata: Metadata = {
  title: "Login | Nextbase Starter Kits Demo",
  description: "Login to your Nextbase Starter Kits Demo account",
};

export default async function LoginPage(props: {
  searchParams: Promise<unknown>;
}) {
  const searchParams = await props.searchParams;
  const { next, nextActionType } = SearchParamsSchema.parse(searchParams);
  return <Login next={next} nextActionType={nextActionType} />;
}
