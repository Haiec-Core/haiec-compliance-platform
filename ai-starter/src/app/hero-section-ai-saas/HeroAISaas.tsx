'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroAISaas() {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="hero-solid w-full py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 lg:flex-row lg:gap-16">
        <motion.div
          className="flex flex-col items-start gap-6 text-center lg:w-1/2 lg:text-left"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.span variants={item}>
            <Badge variant="secondary">Now in Beta</Badge>
          </motion.span>
          <motion.h1 variants={item} className="text-4xl font-bold tracking-tight sm:text-5xl">
            Let AI do the busywork.
          </motion.h1>
          <motion.p variants={item} className="max-w-prose text-muted-foreground">
            Automate routine tasks and free your team to focus on high-impact work with our intelligent workflow engine.
          </motion.p>
          <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button>Start Free Trial</Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline">Watch Demo</Button>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex justify-center lg:w-1/2"
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-full max-w-md rounded-lg overflow-hidden">
            <Image
              src="/marketing/tech-1.jpg"
              alt="AI technology visualization"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <pre className="text-sm font-mono text-white/90 whitespace-pre-wrap">
{`const result = await ai.process(task)
console.log(result)`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
