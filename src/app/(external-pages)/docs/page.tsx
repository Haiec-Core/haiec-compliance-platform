"use client";

import { Link } from "@/components/intl-link";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 max-w-3xl">
      <motion.h1 className="text-4xl font-bold mb-6" {...fadeIn}>
        Documentation
      </motion.h1>

      <motion.p
        className="text-lg mb-8"
        {...fadeIn}
        transition={{ delay: 0.1 }}
      >
        Nextbase Ultimate ships with Fumadocs. Fumadocs is a powerful
        documentation framework integrated into Nextbase Ultimate, designed to
        make creating beautiful and functional documentation a breeze.
      </motion.p>

      <motion.section className="mb-8" {...fadeIn} transition={{ delay: 0.2 }}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          {...fadeIn}
        >
          <Link href="/docs/page-tree-1" className="block">
            <div className="p-6 rounded-lg border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Page Tree 1</h3>
              <p className="text-sm opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
                vitae tincidunt nisl nunc euismod nunc.
              </p>
            </div>
          </Link>
          <Link href="/docs/page-tree-2" className="block">
            <div className="p-6 rounded-lg border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <h3 className="text-lg font-semibold mb-2">Page Tree 2</h3>
              <p className="text-sm opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
                vitae tincidunt nisl nunc euismod nunc.
              </p>
            </div>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section className="mb-8" {...fadeIn} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Sleek, responsive design out of the box</li>
          <li>Built-in search functionality for easy content discovery</li>
          <li>Automatic table of contents generation</li>
          <li>Support for MDX and React components</li>
          <li>Dark mode support</li>
          <li>SEO optimization</li>
        </ul>
      </motion.section>

      <motion.section className="mb-8" {...fadeIn} transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">Using Fumadocs is straightforward:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create your documentation content in MDX files</li>
          <li>Ability to use content collections</li>
          <li>Use Fumadocs components to enhance your docs</li>
          <li>Customize the theme and layout as needed</li>
        </ol>
      </motion.section>

      <motion.section className="mb-8" {...fadeIn} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
        <p className="mb-4">Fumadocs offers extensive customization:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Theming: Adjust colors, typography, and spacing</li>
          <li>Layout: Modify sidebar, header, and footer components</li>
          <li>Components: Create custom MDX components</li>
          <li>Configuration: Fine-tune search, navigation, and more</li>
        </ul>
      </motion.section>
    </div>
  );
}
