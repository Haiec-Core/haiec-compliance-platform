'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroSplit() {
  const leftVariants = {
    hidden: { x: -60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const rightVariants = {
    hidden: { x: 60, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  }

  return (
    <section className="hero-gradient grid items-center gap-8 py-16 lg:grid-cols-2">
      <motion.div
        className="flex flex-col items-start gap-6 text-center lg:text-left"
        variants={leftVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <span className="rounded-md bg-secondary px-3 py-1 text-sm font-medium">Simple &amp; Powerful</span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Elevate Your Workflow</h1>
        <p className="max-w-prose text-muted-foreground">
          Streamline your tasks and boost productivity with our intuitive tools designed for modern teams.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </motion.div>
      <motion.div
        className="flex justify-center lg:justify-end"
        variants={rightVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative w-full max-w-md">
          <Image
            src="/marketing/workspace-1.jpg"
            alt="Modern workspace"
            width={600}
            height={400}
            className="h-auto w-full object-contain rounded-lg"
          />
        </div>
      </motion.div>
    </section>
  )
}
