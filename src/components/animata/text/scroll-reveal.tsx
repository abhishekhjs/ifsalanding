'use client'

import { type MotionValue, motion, useMotionValue, useTransform } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  progress?: MotionValue<number>;
  dimOpacity?: number;
}

// Flatten nested children into individual word tokens
const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = child.props as Record<string, unknown>;
      if (child.type === React.Fragment) {
        result.push(...flatten(childProps.children as React.ReactNode));
      } else if (childProps.children) {
        result.push(React.cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>),
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

function OpacityChild({
  children,
  index,
  progress,
  total,
  dimOpacity = 0.25,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dimOpacity?: number;
}) {
  const opacity = useTransform(
    progress,
    [Math.max(0, (index - 0.5) / total), Math.min(1, (index + 0.8) / total)],
    [dimOpacity, 1]
  );

  let className = "";
  if (React.isValidElement(children)) {
    className = (Reflect.get(children, "props") as Record<string, unknown>)?.className as string;
  }

  return (
    <motion.span style={{ opacity }} className={cn(className, "h-fit inline-block transition-colors")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  className,
  progress: externalProgress,
  dimOpacity = 0.25,
  ...props
}: ScrollRevealProps) {
  const flat = flatten(children);
  const count = flat.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const internalProgress = useMotionValue(0);

  const activeProgress = externalProgress ?? internalProgress;

  const handleScroll = useCallback(() => {
    if (externalProgress) return;
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    internalProgress.set(maxScroll > 0 ? scrollTop / maxScroll : 0);
  }, [internalProgress, externalProgress]);

  useEffect(() => {
    if (externalProgress) return;
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, externalProgress]);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "relative w-full text-inherit",
        !externalProgress && "h-96 overflow-y-scroll",
        className,
      )}
    >
      <div className="flex h-fit w-full min-w-fit flex-wrap whitespace-break-spaces items-center justify-center">
        {flat.map((child, index) => {
          return (
            <OpacityChild
              progress={activeProgress}
              index={index}
              total={count}
              dimOpacity={dimOpacity}
              key={index}
            >
              {child}
            </OpacityChild>
          );
        })}
      </div>

      {!externalProgress &&
        Array.from({ length: count }).map((_, index) => (
          <div key={index} className="h-32" />
        ))}
    </div>
  );
}
