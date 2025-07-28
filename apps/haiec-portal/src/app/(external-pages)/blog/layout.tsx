import "./layout.css";

export const revalidate = 60;
export const dynamic = "force-static";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="relative mx-auto md:container sm:px-2 md:px-6 space-x-4 sm:space-x-6 lg:space-x-8 xl:space-x-12">
        <div className="py-8 sm:py-12 lg:py-16 xl:py-20">{children}</div>
      </div>
    </div>
  );
}
