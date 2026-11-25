'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface SidewaysWordRevealProps {
  lines: string[]
  className?: string
  accentBarClassName?: string
  as?: 'h1' | 'h2' | 'h3'
  hideAccentBar?: boolean
}

export function SidewaysWordReveal({
  lines,
  className,
  accentBarClassName,
  as = 'h2',
  hideAccentBar = false,
}: SidewaysWordRevealProps) {
  const Component = as as any

  const parsedLines = useMemo(() => {
    let count = 0
    return lines.map((line) => {
      const words = line
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => ({
          text: w === '&amp;' ? '&' : w,
          index: count++,
        }))
      return words
    })
  }, [lines])

  const totalWords = parsedLines.reduce((acc, l) => acc + l.length, 0)

  return (
    <div className="relative">
      <Component className={className}>
        {parsedLines.map((lineWords, lineIdx) => (
          <span key={lineIdx} className="block">
            {lineWords.map((item) => {
              const isEven = item.index % 2 === 0
              const initialX = isEven ? -40 : 40
              const initialSkew = isEven ? -12 : 12

              return (
                <motion.span
                  key={item.index}
                  initial={{
                    opacity: 0,
                    x: initialX,
                    skewX: initialSkew,
                    filter: 'blur(8px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    skewX: 0,
                    filter: 'blur(0px)',
                  }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: item.index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0 will-change-transform"
                >
                  {item.text}
                </motion.span>
              )
            })}
          </span>
        ))}
      </Component>

      {!hideAccentBar && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.65,
            delay: Math.min(totalWords * 0.06 + 0.12, 0.65),
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'left' }}
          className={cn('h-[4px] w-20 bg-[#CBA258] mt-4', accentBarClassName)}
        />
      )}
    </div>
  )
}
