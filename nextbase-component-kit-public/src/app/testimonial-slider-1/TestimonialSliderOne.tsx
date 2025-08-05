'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const testimonials = [
  {
    quote: 'This product completely transformed our workflow.',
    author: 'Jane Doe, CEO of ExampleCorp',
    avatar: '/vercel.svg',
  },
  {
    quote: 'A must have for any modern business.',
    author: 'John Smith, CTO of Widgets Inc.',
    avatar: '/next.svg',
  },
  {
    quote: 'Incredible ROI and fantastic support.',
    author: 'Sara Lee, Founder of StartItUp',
    avatar: '/globe.svg',
  },
]

const logos = ['/next.svg', '/vercel.svg', '/globe.svg', '/file.svg']

const stats = [
  { label: '3x ROI', value: '3x' },
  { label: '500+ Happy Customers', value: '500+' },
  { label: '99% Satisfaction', value: '99%' },
]

export default function TestimonialSliderOne() {
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="flex w-full flex-col items-center gap-12 py-16">
      <div className="logo-marquee w-full overflow-hidden border-y border-border py-4">
        <div className="logo-track flex items-center gap-8">
          {logos.concat(logos).map((logo, i) => (
            <Image key={i} src={logo} alt="logo" width={80} height={40} className="h-8 w-auto grayscale" />
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-xl text-center min-h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[index].quote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-lg font-medium md:text-xl">&ldquo;{testimonials[index].quote}&rdquo;</p>
            <div className="flex items-center gap-2">
              <Image src={testimonials[index].avatar} alt={testimonials[index].author} width={32} height={32} className="size-8" />
              <span className="text-sm text-muted-foreground">{testimonials[index].author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-primary">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
