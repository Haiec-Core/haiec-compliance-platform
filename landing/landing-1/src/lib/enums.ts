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

export const AVATARS = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702966932/usenextbase/Avatars/avatar_4.webp",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702966938/usenextbase/Avatars/avatar_3.webp",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702966909/usenextbase/Avatars/avatar_5.webp",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702966958/usenextbase/Avatars/avatar_2.webp",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1702966963/usenextbase/Avatars/avatar_1.webp",
  },
];

export const SHOWCASE_FEATURES = [
  {
    title: "Feature One",
    subtitle: "User Authentication",
    navigateTo: "#",
    desc: "Nextbase supports a wide range of authentication providers such as Google, GitHub, Twitter, Facebook, Apple, Discord and many more. It also provides the flexibility for users to sign in with their email and password or even just with their email.",
    features: [
      "Multi-provider authentication support",
      "Flexible sign-in options: Email and password",
      "Comprehensive user authentication system",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921481/usenextbase/tinywow_signup_43386486_t9iuny.webm",
  },
  {
    title: "Feature Two",
    subtitle: "Admin Panel",
    navigateTo: "#",
    desc: "Nextbase comes with a built-in admin panel that allows you to have a secret area within your app where you can manage users, teams, organizations and more. It provides a comprehensive and intuitive interface for managing all aspects of your application, from users to projects and organizations.",
    features: [
      "Integrated admin panel",
      "Secret area within the app for admin access.",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702915076/usenextbase/tinywow_admin-panel-gif_43379830_tltcqi.webm",
  },
  {
    title: "Feature Three",
    subtitle: "User Impersonation",
    navigateTo: "#",
    features: [
      "Simplified debugging of user-facing issues",
      "Mimic and view the app from any user's view",
      "Useful for troubleshooting complex problems",
    ],
    desc: "Admin panel also comes with a powerful debugging feature called User Impersonation. This allows you to impersonate any user in your app and see what they see.Some issues are hard to reproduce and this feature will help you debug the issues and fix them.",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921499/usenextbase/tinywow_user-imp_43386586_xpo6pr.webm",
  },
  {
    title: "Feature Four",
    subtitle: "Incredible performance",
    navigateTo: "#",
    features: [
      "Leverages Next.js 13's latest features",
      "Enhanced data fetching for performance.",
      "Exceptional UX through Next.js capabilities.",
    ],
    desc: "Nextbase is designed to deliver incredible performance. It leverages Next.js 13's all-new app folder, layouts, server components, and server-side rendering to optimize data fetching and provide the best user experience. With Nextbase, you can build high-performance applications that meet the demands of today's users.",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702916928/usenextbase/tinywow_layouts_43381898_qpovdj.webm",
  },
  {
    title: "Feature Five",
    subtitle: "Simplified Payment flow",
    navigateTo: "#",
    features: [
      "Always in sync with stripe",
      "Pre-configured integration with Stripe",
      "Real-time updates on customer activities",
    ],
    desc: "Nextbase is pre-configured with Stripe, a leading online payment processing platform. Your database will be in sync with all customer activity in Stripe via Webhooks. ",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702916692/usenextbase/tinywow_stripe-payments-gif_43381706_by2uhy.webm",
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
    title: "Others",
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
