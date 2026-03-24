import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps extends ComponentPropsWithoutRef<"span"> {
  colorFrom?: string
  colorTo?: string
  colorMid?: string
  speed?: number
}

export function AnimatedGradientText({
  children,
  className,
  colorFrom = "#6366f1",
  colorMid = "#22d3ee",
  colorTo = "#8b5cf6",
  speed = 1,
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorMid}, ${colorTo}, ${colorFrom})`,
        backgroundSize: "300% 100%",
        animation: `gradient-shift ${6 / speed}s linear infinite`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    >
      {children}
    </span>
  )
}
