/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none bg-transparent">
      {/* Simulation Grid System - Golden mesh lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,160,89,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.11)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,160,89,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,160,89,0.04)_1px,transparent_1px)] bg-[size:10px_10px] opacity-80" />

      {/* Game simulation viewport targeting indicators (Subtle crosshair points for HUD feel) */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-brand-purple/45" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-brand-purple/45" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-brand-purple/45" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-brand-purple/45" />

      {/* Futuristic Coordinates Readouts (Corner metrics to enhance HUD feel) */}
      <div className="absolute top-10 left-16 font-mono text-[9px] text-brand-purple/45 tracking-widest select-none hidden sm:block">
        SYS.LOC // [40.7128° N, 74.0060° W]
      </div>
      <div className="absolute top-10 right-16 font-mono text-[9px] text-brand-purple/45 tracking-widest select-none text-right hidden sm:block">
        RENDER: ACTIVE // 120 FPS
      </div>
      <div className="absolute bottom-10 left-16 font-mono text-[9px] text-brand-purple/45 tracking-widest select-none hidden sm:block">
        MATRIX.GRID = ENHANCED
      </div>
      <div className="absolute bottom-10 right-16 font-mono text-[9px] text-brand-purple/45 tracking-widest select-none text-right hidden sm:block">
        COGNITIVE_CORE_V3.5_FLASH
      </div>

      {/* Axis crosshairs in the margins */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-purple/35 font-mono text-[10px] font-bold select-none">
        ⌖
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-purple/35 font-mono text-[10px] font-bold select-none">
        ⌖
      </div>

      {/* High-fidelity simulation radar/pulse wave ring */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute flex h-64 w-64 rounded-full border border-brand-purple/25 animate-ping opacity-60" />
        <span className="absolute flex h-[420px] w-[420px] rounded-full border border-brand-purple/15 animate-ping opacity-40 [animation-delay:1.5s]" />
      </div>

      {/* Linear sweeping laser beam (Simulation render-line) */}
      <motion.div
        animate={{
          y: ["-20%", "120%"],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-brand-purple/35 to-transparent shadow-[0_0_10px_rgba(197,160,89,0.35)]"
      />

      {/* Dynamic Simulation Gradient Orbs in Golden Scheme */}
      {/* Orb 1: Golden-Amber Ambient Light source */}
      <motion.div
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-5 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.15)_0%,rgba(197,160,89,0.02)_75%,transparent_100%)] blur-[45px]"
      />

      {/* Orb 2: Ultra deep Charcoal/Gold shade generator */}
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-5 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(24,24,27,0.08)_0%,rgba(197,160,89,0.06)_55%,transparent_100%)] blur-[60px]"
      />

      {/* Orb 3: High speed highlight spark */}
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, 60, -70, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-purple/5 opacity-[0.08] blur-[35px]"
      />
    </div>
  );
}

