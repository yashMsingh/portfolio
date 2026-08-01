import { cn } from '@/lib/utils'
import { motion } from "motion/react"

interface GridPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function GridPatternCard({ 
  children, 
  className,
  patternClassName,
  gradientClassName
}: GridPatternCardProps) {
  return (
    <motion.div
      className={cn(
        "border w-full rounded-md overflow-hidden",
        "bg-white dark:bg-zinc-900",
        "border-black/10 dark:border-white/10",
        "p-3",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={cn(
        "size-full bg-repeat bg-[length:30px_30px]",
        "bg-grid-pattern-light dark:bg-grid-pattern",
        patternClassName
      )}>
        <div className={cn(
          "size-full bg-gradient-to-tr",
          "from-white/90 via-white/40 to-white/10",
          "dark:from-zinc-900/90 dark:via-zinc-900/40 dark:to-zinc-900/10",
          gradientClassName
        )}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function GridPatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-4 md:p-6", className)} 
      {...props} 
    />
  )
}
