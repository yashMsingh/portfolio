import { useEffect, useRef } from "react";

export default function GraffitiBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // We can add some slight parallax or movement if needed
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Procedural Brick / Concrete Wall using SVG Filters */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="wall-texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.5 0"
            in="noise"
            result="coloredNoise"
          />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#wall-texture)" fill="#3a3538" />
      </svg>

      {/* Grain/Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Scattered Splatters */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-neon-magenta)] rounded-full mix-blend-screen opacity-10 blur-[60px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-neon-cyan)] rounded-full mix-blend-screen opacity-10 blur-[80px]" />
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[var(--color-acid-yellow)] rounded-full mix-blend-screen opacity-5 blur-[100px]" />

      {/* Stencil Icons / Tags (Optional) */}
      <div className="absolute top-32 right-32 opacity-[0.04] transform rotate-12 scale-150">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
    </div>
  );
}
