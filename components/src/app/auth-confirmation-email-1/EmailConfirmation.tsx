'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion, type HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'

export function EmailConfirmation({ className, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="text-balance text-muted-foreground">
              We sent you a link to reset your password.
            </p>
            <Button asChild className="w-full max-w-xs">
              <Link href="/auth-login-card-1">Return to sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function EmailConfirmationPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-md">
        <EmailConfirmation />
      </div>
    </div>
  )
}
