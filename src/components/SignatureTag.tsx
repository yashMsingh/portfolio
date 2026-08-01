import { motion } from "motion/react";

export default function SignatureTag({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, pathLength: 0 }}
      whileInView={{ opacity: 1, pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`absolute select-none pointer-events-none drop-shadow-lg ${className}`}
      style={{ transform: "rotate(-8deg)" }}
    >
      <svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[var(--color-spray-orange)]"
      >
        <path
          d="M 20 20 Q 30 10 40 40 T 60 70 Q 70 50 80 30 T 100 20 Q 110 50 80 60"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          className="drip-svg"
        />
        {/* Simple YKS cursive-ish stroke */}
        <path
          d="M 30 65 Q 40 75 50 65"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
    </motion.div>
  );
}
