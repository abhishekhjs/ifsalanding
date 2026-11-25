'use client'

import React, { useState, useEffect, useRef, useId } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface KineticWordItem {
  text: string
  className?: string
}

export type KineticWord = string | KineticWordItem

export interface KineticCenterBuildProps {
  /** Array of words for this line. Can be strings or { text, className } objects for custom styling. */
  words?: KineticWord[]
  /** Legacy Animata support: phrases array */
  phrases?: string[][]
  /** Custom wrapper class */
  className?: string
  /** Gap between words, defaults to gap-[0.24em] */
  gapClassName?: string
  /** Initial delay in ms before first word enters */
  initialDelayMs?: number
  /** Duration in ms for first word entrance */
  firstWordDurationMs?: number
  /** Hold time at center before the push phase starts in ms */
  holdBeforePushMs?: number
  /** Duration in ms for the push and arrival of the second word */
  pushDurationMs?: number
  /** External replay counter (increments trigger replay) */
  replayKey?: number
  /** On click handler */
  onClick?: () => void
}

export default function KineticCenterBuild({
  words,
  phrases,
  className,
  gapClassName = 'gap-[0.26em]',
  initialDelayMs = 40,
  firstWordDurationMs = 380,
  holdBeforePushMs = 120,
  pushDurationMs = 440,
  replayKey = 0,
  onClick,
}: KineticCenterBuildProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const word0Ref = useRef<HTMLSpanElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)

  // Normalize words input
  const resolvedWords: KineticWord[] = words ?? (phrases && phrases[0] ? phrases[0] : ['Where', 'ambition'])
  const word0 = resolvedWords[0]
  const word1 = resolvedWords[1]

  const word0Text = typeof word0 === 'string' ? word0 : word0?.text ?? ''
  const word0Class = typeof word0 === 'string' ? '' : word0?.className ?? ''

  const word1Text = typeof word1 === 'string' ? word1 : word1?.text ?? ''
  const word1Class = typeof word1 === 'string' ? '' : word1?.className ?? ''

  // Phase: 'init' | 'word0' | 'push' | 'done'
  const [phase, setPhase] = useState<'init' | 'word0' | 'push' | 'done'>('init')
  const [shiftX, setShiftX] = useState(0)

  // Measure word dimensions and run animation choreography
  useEffect(() => {
    let cancelled = false
    setPhase('init')

    // Measure on next frame once DOM has laid out
    const rafId = requestAnimationFrame(() => {
      if (cancelled) return

      if (word1Ref.current && containerRef.current) {
        const w1 = word1Ref.current.offsetWidth
        const style = window.getComputedStyle(containerRef.current)
        const gapPx = parseFloat(style.columnGap || style.gap) || 16
        // Shift word0 to the right by (w1 + gap)/2 to place it exactly at center
        const computedShift = Math.round((w1 + gapPx) / 2)
        setShiftX(computedShift)
      } else {
        setShiftX(0)
      }

      // Step 1: Word 0 enters at dead center
      const timer1 = setTimeout(() => {
        if (cancelled) return
        setPhase('word0')

        // Step 2: Push phase — Word 0 slides left, Word 1 enters from right
        const timer2 = setTimeout(() => {
          if (cancelled) return
          setPhase('push')

          // Step 3: Locked done state
          const timer3 = setTimeout(() => {
            if (cancelled) return
            setPhase('done')
          }, pushDurationMs + 50)

          return () => clearTimeout(timer3)
        }, firstWordDurationMs + holdBeforePushMs)

        return () => clearTimeout(timer2)
      }, initialDelayMs)

      return () => clearTimeout(timer1)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
    }
  }, [replayKey, initialDelayMs, firstWordDurationMs, holdBeforePushMs, pushDurationMs, word0Text, word1Text])

  const firstDurationSec = firstWordDurationMs / 1000
  const pushDurationSec = pushDurationMs / 1000

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center overflow-visible select-none',
        gapClassName,
        className,
      )}
    >
      {/* ── WORD 0: Enters at center, then slides left ────────────────── */}
      <motion.span
        ref={word0Ref}
        animate={
          phase === 'done' || phase === 'push'
            ? { x: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }
            : phase === 'word0'
            ? { x: shiftX, opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { x: shiftX, opacity: 0, scale: 0.96, filter: 'blur(8px)' }
        }
        transition={
          phase === 'push'
            ? { duration: pushDurationSec, ease: [0.16, 1, 0.3, 1] }
            : phase === 'word0'
            ? { duration: firstDurationSec, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0 }
        }
        className={cn('inline-block whitespace-nowrap will-change-transform', word0Class)}
      >
        {word0Text}
      </motion.span>

      {/* ── WORD 1: Arrives on the right while Word 0 pushes left ───────── */}
      {word1Text ? (
        <motion.span
          ref={word1Ref}
          animate={
            phase === 'done' || phase === 'push'
              ? { x: 0, opacity: 1, filter: 'blur(0px)' }
              : { x: 50, opacity: 0, filter: 'blur(8px)' }
          }
          transition={
            phase === 'push'
              ? { duration: pushDurationSec, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0 }
          }
          className={cn('inline-block whitespace-nowrap will-change-transform', word1Class)}
        >
          {word1Text}
        </motion.span>
      ) : null}
    </div>
  )
}
