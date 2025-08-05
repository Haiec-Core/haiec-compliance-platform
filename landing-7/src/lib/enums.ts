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
    title: "Feature-One",
    subtitle: "User Authentication",
    navigateTo: "#",
    desc: "Nextbase supports a wide range of authentication providers such as Google, GitHub, Twitter, Facebook, Apple, Discord and many more. ",
    features: [
      "Multi-provider authentication support",
      "Flexible sign-in options: Email and password",
      "Comprehensive user authentication system",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921481/usenextbase/tinywow_signup_43386486_t9iuny.webp",
  },
  {
    title: "Feature-Two",
    subtitle: "Admin Panel",
    navigateTo: "#",
    desc: "Nextbase comes with a built-in admin panel that allows you to have a secret area within your app .",
    features: [
      "Integrated admin panel",
      "Secret area within the app for admin access.",
    ],
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702915076/usenextbase/tinywow_admin-panel-gif_43379830_tltcqi.webp",
  },
  {
    title: "Feature-Three",
    subtitle: "User Impersonation",
    navigateTo: "#",
    features: [
      "Simplified debugging of user-facing issues",
      "Mimic and view the app from any user's view",
      "Useful for troubleshooting complex problems",
    ],
    desc: "Admin panel also comes with a powerful debugging feature called User Impersonation.",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702921499/usenextbase/tinywow_user-imp_43386586_xpo6pr.webp",
  },
  {
    title: "Feature-Four",
    subtitle: "Incredible performance",
    navigateTo: "#",
    features: [
      "Leverages Next.js 13's latest features",
      "Enhanced data fetching for performance.",
      "Exceptional UX through Next.js capabilities.",
    ],
    desc: "Nextbase is designed to deliver incredible performance. With Nextbase, you can build high-performance applications that meet the demands of today's users.",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702916928/usenextbase/tinywow_layouts_43381898_qpovdj.webp",
  },
  {
    title: "Feature-Five",
    subtitle: "Simplified Payment flow",
    navigateTo: "#",
    features: [
      "Always in sync with stripe",
      "Pre-configured integration with Stripe",
      "Real-time updates on customer activities",
    ],
    desc: "Nextbase is pre-configured with Stripe, a leading online payment processing platform. Your database will be in sync with all customer activity in Stripe via Webhooks. ",
    imgSrc:
      "https://res.cloudinary.com/dkqrmlxlg/video/upload/v1702916692/usenextbase/tinywow_stripe-payments-gif_43381706_by2uhy.webp",
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
export const testimonials = [
  [
    [
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
        author: {
          name: "Leslie Alexander",
          handle: "lesliealexander",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      // More testimonials...
    ],
    [
      {
        body: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
        author: {
          name: "Lindsay Walton",
          handle: "lindsaywalton",
          imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },
      {
        body: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
        author: {
          name: "Tom Cook",
          handle: "tomcook",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
      },

      // More testimonials...
    ],
  ],
];

export const FAQ_QUESTIONS = [
  {
    id: 1,
    question: "Question One",
    answer: "",
  },
  {
    id: 2,
    question: "Question Two",
    answer: "",
  },
  {
    id: 3,
    question: "Question Three",
    answer: "",
  },
  {
    id: 4,
    question: "Question Four",
    answer: "",
  },
];
