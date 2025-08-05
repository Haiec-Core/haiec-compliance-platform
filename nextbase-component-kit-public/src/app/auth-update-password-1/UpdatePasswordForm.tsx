'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion, type HTMLMotionProps } from 'framer-motion'
import Link from 'next/link'

export function UpdatePasswordForm({ className, ...props }: HTMLMotionProps<'div'>) {
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
          <form className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Update password</h1>
              <p className="text-balance text-muted-foreground">
                Enter your new password below
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Update password
            </Button>
            <div className="text-center text-sm">
              <Link href="/auth-login-card-1" className="underline underline-offset-4">
                Back to sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-md">
        <UpdatePasswordForm />
      </div>
    </div>
  )
}
