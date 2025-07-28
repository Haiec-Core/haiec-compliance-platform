import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const components = [
  {
    name: "Hero Section Split",
    href: "/hero-section-split",
    image: "/marketing/abstract-3.jpg",
    tags: ["Hero", "Split Layout", "Modern"]
  },
  {
    name: "Hero Section AI SaaS",
    href: "/hero-section-ai-saas",
    image: "/marketing/tech-2.jpg",
    tags: ["Hero", "AI", "SaaS", "Tech"]
  },
  {
    name: "Hero Section 1",
    href: "/hero-section-1",
    image: "/marketing/gradient-1.jpg",
    tags: ["Hero", "Gradient", "Landing"]
  },
  {
    name: "Auth Login Card",
    href: "/auth-login-card-1",
    image: "/marketing/pattern-2.jpg",
    tags: ["Auth", "Login", "Forms"]
  },
  {
    name: "Auth Signup Card",
    href: "/auth-signup-card-1",
    image: "/marketing/pattern-12.jpg",
    tags: ["Auth", "Signup", "Forms"]
  },
  {
    name: "Auth Confirmation Email",
    href: "/auth-confirmation-email-1",
    image: "/marketing/pattern-17.jpg",
    tags: ["Auth", "Email", "Confirmation"]
  },
  {
    name: "Auth Forgot Password",
    href: "/auth-forgot-password-1",
    image: "/marketing/creative-2.jpg",
    tags: ["Auth", "Password", "Reset"]
  },
  {
    name: "Auth Update Password",
    href: "/auth-update-password-1",
    image: "/marketing/gradient-2.jpg",
    tags: ["Auth", "Password", "Update"]
  },
  {
    name: "Testimonial Horizontal Carousel",
    href: "/testimonial-horizontal-scrollable-1",
    image: "/marketing/business-1.jpg",
    tags: ["Testimonial", "Carousel", "Social Proof"]
  },
  {
    name: "Testimonial Slider",
    href: "/testimonial-slider-1",
    image: "/marketing/team-2.jpg",
    tags: ["Testimonial", "Slider", "Reviews"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image
                  className="rounded-lg object-cover"
                  src="/marketing/tech-2.jpg"
                  alt="Nextbase Components"
                  fill
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Nextbase Components
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Beautiful, reusable components for your Next.js projects
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-medium text-sm h-10 px-5"
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deploy now
              </a>
              <a
                className="rounded-full border border-solid border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm h-10 px-5"
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Docs
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Component Library
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore our collection of beautiful, responsive components ready to use in your Next.js applications.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {components.map((component) => (
            <Link
              key={component.href}
              href={component.href}
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={component.image}
                    alt={component.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {component.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {component.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/marketing/code-1.jpg"
                alt="Learn"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/marketing/code-2.jpg"
                alt="Examples"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/marketing/code-3.jpg"
                alt="Next.js"
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
              Go to nextjs.org →
            </a>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
