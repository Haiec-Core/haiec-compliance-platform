"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

export default function HeroOne() {
  const shouldReduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full bg-background py-24 md:py-32"
    >
      <div className="container mx-auto flex max-w-screen-lg flex-col items-center gap-6 text-center">
        <motion.span variants={item} className="" >
          <Badge>New in v2.0</Badge>
        </motion.span>
        <motion.h1
          variants={item}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          Let AI automate your workflows.
        </motion.h1>
        <motion.p variants={item} className="max-w-prose text-muted-foreground">
          Replace manual tasks with intelligent automation and scale your business faster with our modern SaaS platform.
        </motion.p>
        <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} aria-label="Start free trial">
              Start Free Trial
            </motion.button>
          </Button>
          <Button variant="outline" asChild>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} aria-label="Learn more">
              Learn More
            </motion.button>
          </Button>
        </motion.div>
        <motion.div 
          variants={item} 
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }} 
          className="w-full max-w-3xl overflow-hidden rounded-lg shadow-xl"
        >
          <Image
            src="/marketing/pattern-5.jpg"
            alt="Abstract pattern"
            width={960}
            height={540}
            className="hero-image mx-auto w-full object-cover"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  )
}
