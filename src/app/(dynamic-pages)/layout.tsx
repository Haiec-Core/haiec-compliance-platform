// do not cache this layout
export const dynamic = "force-dynamic";

export const metadata = {
  icons: {
    icon: "/images/logo-black-main.ico",
  },
  title: "Nextbase Ultimate",
  description: "Nextbase Ultimate",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
