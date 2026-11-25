'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

export interface CardRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  index?: number
  delay?: number
  threshold?: number
}

export function CardReveal({
  children,
  className,
  index,
  delay,
  threshold = 0.12,
  style,
  ...props
}: CardRevealProps) {
  // Staggering: Grids pass index * 100ms or 120ms into CSS variable --d or motion delay
  const computedDelaySec = delay !== undefined ? delay : index !== undefined ? index * 0.1 : 0
  const delayMs = Math.round(computedDelaySec * 1000)

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 72,
        scale: 0.94,
        rotate: -1.5,
        filter: 'blur(10px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
        delay: computedDelaySec,
      }}
      style={
        {
          '--d': `${delayMs}ms`,
          ...style,
        } as React.CSSProperties
      }
      className={cn('will-change-transform', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Aliased export for convenience
export const Reveal = CardReveal
