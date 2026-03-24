"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
  size?: number
}

export const BorderBeam = ({
  className,
  duration = 6,
  delay = 0,
  colorFrom = "#6366f1",
  colorTo = "#22d3ee",
  borderWidth = 1,
  size = 120,
}: BorderBeamProps) => {
  // Rotating conic-gradient approach: works in all modern browsers
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-[-1px] overflow-hidden rounded-[inherit]",
        className,
      )}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-[-100%]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 20deg, ${colorTo} 40deg, transparent 80deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          delay: -delay,
        }}
      />
      {/* Inner mask to show only border */}
      <div
        className="absolute rounded-[inherit] bg-[#0d1117]"
        style={{ inset: borderWidth }}
      />
    </div>
  )
}
