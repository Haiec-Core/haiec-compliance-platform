export const TESTIMONIES = [
  {
    author: "Mitch Olsen",
    role: "CEO",
    brand: "Just",
    fallback: "MO",
    profilePic:
      "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702967050/usenextbase/Avatars/testimony_1.webp",
    review:
      "We've tried numerous SaaS solutions, but none compare to Company Z's platform. As our business expanded, the scalability of this SaaS became evident – it effortlessly grew with us.",
  },
  {
    author: "James Parr",
    role: "CEO",
    brand: "Another",
    fallback: "JP",
    profilePic:
      "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702967047/usenextbase/Avatars/testimony_3.webp",
    review:
      "Implementing SaaS from Company Y has been a game-changer for us. The analytics tools provided have allowed us to make data-driven decisions, leading to smarter strategies and increased profitability.",
  },
  {
    author: "Michelle Dakota",
    role: "CEO",
    brand: "SAAS",
    fallback: "MD",
    profilePic:
      "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702967097/usenextbase/Avatars/testimony_2.webp",
    review:
      "Company X's SaaS has completely transformed the way we operate. Tasks that used to take hours are now accomplished in minutes. Our business wouldn't be where it is today without this game-changing solution.",
  },
];

export const SHOWCASE_FEATURES = [
  {
    title: "Feature One",
    subtitle: "Tab 1",
    navigateTo: "#",
    desc: "Lorem ipsum adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. ",
    features: [
      "Multi-provider authentication support",
      "Flexible sign-in options: Email and password",
      "Comprehensive user authentication system",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921481/usenextbase/tinywow_signup_43386486_t9iuny.webp",
  },
  {
    title: "Feature Two",
    subtitle: "Tab 2",
    navigateTo: "#",
    desc: "Lorem ipsum dolor consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. ",
    features: [
      "Integrated admin panel",
      "Secret area within the app for admin access.",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702915076/usenextbase/tinywow_admin-panel-gif_43379830_tltcqi.webp",
  },
  {
    title: "Feature Three",
    subtitle: "Tab 3",
    navigateTo: "#",
    features: [
      "Simplified debugging of user-facing issues",
      "Mimic and view the app from any user's view",
      "Useful for troubleshooting complex problems",
    ],
    desc: "Lorem ipsum dolor sit amet, scing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. ",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921499/usenextbase/tinywow_user-imp_43386586_xpo6pr.webp",
  },
];

export type FooterCategory = {
  id: number;
  title: string;
  links: { link: string; title: string }[];
};

export const FOOTER_LINKS: FooterCategory[] = [
  {
    id: 1,
    title: "Product",
    links: [
      {
        link: "#",
        title: "Pricing",
      },
      {
        link: "#",
        title: "Demos",
      },
      {
        link: "#",
        title: "Changelog",
      },
      {
        link: "#",
        title: "Roadmap",
      },
    ],
  },
  {
    id: 2,
    title: "Features",
    links: [
      {
        link: "#",
        title: "Authentication",
      },
      {
        link: "#",
        title: "Organization",
      },
      {
        link: "#",
        title: "Admin Panel",
      },
      {
        link: "#",
        title: "Payments",
      },
    ],
  },
  {
    id: 5,
    title: "Other",
    links: [
      {
        link: "#",
        title: "Resources",
      },
      {
        link: "#",
        title: "Services",
      },
      {
        link: "#",
        title: "Contact Us",
      },
      {
        link: "#",
        title: "Affliates",
      },
    ],
  },
  {
    id: 4,
    title: "Legal",
    links: [
      {
        link: "#",
        title: "Privacy Policy",
      },
      {
        link: "#",
        title: "Terms of Services",
      },
    ],
  },

  {
    id: 3,
    title: "Support",
    links: [
      {
        link: "#",
        title: "Docs",
      },
      {
        link: "#",
        title: "Blog",
      },
      {
        link: "#",
        title: "FAQ",
      },
    ],
  },
];

export const featuredTestimonial = {
  body: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
  author: {
    name: "Brenna Goyette",
    handle: "brennagoyette",
    imageUrl:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80",
    logoUrl: "https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg",
  },
};

export const FAQ_QUESTIONS = [
  {
    id: 1,
    question: "Why should I use Nextbase?",
    answer:
      "Nextbase is a starter kit that comes with everything you need to build your next SaaS. It's built on top of Next.js, Supabase and React Query. It comes with authentication, payments, subscriptions, user settings, edge functions, pre-built components and more. Because Nextbase comes with authentication, payments and just about everything you need to build your next SaaS, you can just focus on building your product.",
  },
  {
    id: 2,
    question: "Why can't I just use an open-source starter kit?",
    answer:
      "You can and there are some great open-source boilerplates out there. But since they are open-source, most of them are side-projects and are not actively maintained. Open source developers are also not incentivized to build a great product or with providing support. Nextbase is built by a team of developers who are invested in your success. We are constantly improving Nextbase and adding new features to it. We are also available to help you out if you get stuck. We also have a Discord community where you can ask questions and get help from other developers who are using Nextbase. We also have a roadmap for Nextbase and we are constantly adding new features to it. We also offer paid support and custom builds if you need help with your project.",
  },
  {
    id: 3,
    question: "Who is Nextbase for?",
    answer:
      "Nextbase is for any developer who wants to build a SaaS. It's a great starting point for your next project. The only requirement is that you know React and Next.js. Supabase is easy to learn and the code is in Javascript, so that shouldn't be hard to get used to. Ideally Nextbase is best suited for you if 1. You are an experienced React.js developer 2. You are familiar with Next.js and React 3. You can write basic Postgres and can hence navigate Supabase.",
  },
  {
    id: 4,
    question: "How do I get support?",
    answer:
      "You can get support by emailing us at admin[at]arni[hyphen]creative[dot]com. We'll get back to you as soon as possible. We're also available on Discord. You will also be invited to join our Discord server once you purchase the product.",
  },
];
