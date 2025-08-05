"use client"

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  name: string
  title: string
  quote: string
  rating: number
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Jane Doe',
    title: 'CEO, Acme Inc',
    quote: 'This product changed the way our team works. Highly recommended!',
    rating: 5,
  },
  {
    name: 'John Smith',
    title: 'CTO, Example Corp',
    quote: 'A must-have tool for modern businesses.',
    rating: 4,
  },
  {
    name: 'Sara Lee',
    title: 'Founder, Startup',
    quote: 'Our productivity doubled after using this.',
    rating: 5,
  },
]

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="testimonial-card w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <Avatar className="size-16">
          {testimonial.avatar && (
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          )}
          <AvatarFallback>
            {testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
        <p className="text-sm text-muted-foreground max-w-prose">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-5 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = testimonials.length

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  // autoplay on desktop
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(min-width: 768px)').matches) return
    const id = setInterval(() => next(), 5000)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 50) prev()
            else if (info.offset.x < -50) next()
          }}
        >
          <TestimonialCard testimonial={testimonials[index]} />
        </motion.div>
      </AnimatePresence>
      <Button
        variant="outline"
        size="icon"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2"
      >
        <ChevronLeft className="size-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <ChevronRight className="size-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}
