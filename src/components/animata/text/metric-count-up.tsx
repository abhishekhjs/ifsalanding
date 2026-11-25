'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'motion/react'
import { cn } from '@/lib/utils'

export interface MetricCountUpProps {
  value: string | number
  durationMs?: number
  delayMs?: number
  className?: string
}

export function MetricCountUp({
  value,
  durationMs = 1600,
  delayMs = 0,
  className,
}: MetricCountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(containerRef, { amount: 0.12, once: true })

  // Splits strings like "12+", "₹17L+", or "1000+" into prefix, numeric digits, and suffix
  const { prefix, targetNum, suffix, isNumeric } = useMemo(() => {
    const str = String(value).trim()
    const match = str.match(/^([^\d]*)(\d+)(.*)$/)

    if (!match) {
      return { prefix: '', targetNum: 0, suffix: str, isNumeric: false }
    }

    return {
      prefix: match[1],
      targetNum: parseInt(match[2], 10),
      suffix: match[3],
      isNumeric: true,
    }
  }, [value])

  const [displayNum, setDisplayNum] = useState(0)

  useEffect(() => {
    if (!isInView || !isNumeric) return

    let animFrameId: number
    let startTime: number | null = null

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime
        const p = Math.min(1, elapsed / durationMs)

        // Quartic ease-out function: 1 - (1 - p)^4
        const easeOutQuart = 1 - Math.pow(1 - p, 4)
        const current = Math.round(targetNum * easeOutQuart)

        setDisplayNum(current)

        if (p < 1) {
          animFrameId = requestAnimationFrame(step)
        } else {
          setDisplayNum(targetNum)
        }
      }

      animFrameId = requestAnimationFrame(step)
    }, delayMs)

    return () => {
      clearTimeout(timer)
      if (animFrameId) cancelAnimationFrame(animFrameId)
    }
  }, [isInView, isNumeric, targetNum, durationMs, delayMs])

  if (!isNumeric) {
    return (
      <span ref={containerRef} className={className}>
        {value}
      </span>
    )
  }

  return (
    <motion.span
      ref={containerRef}
      initial={{ scale: 0.6, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{
        duration: 0.75,
        delay: delayMs / 1000,
        ease: [0.34, 1.56, 0.64, 1], // Elastic overshoot curve
      }}
      className={cn('inline-block tabular-nums will-change-transform', className)}
    >
      <span>{prefix}</span>
      <span>{displayNum}</span>
      <span>{suffix}</span>
    </motion.span>
  )
}

// Aliased export for convenience
export const CountUp = MetricCountUp
