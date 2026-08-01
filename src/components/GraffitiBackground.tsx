import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  isDrip?: boolean;
}

interface StencilTag {
  x: number;
  y: number;
  label: string;
  color: string;
  rotation: number;
  scale: number;
}

export default function GraffitiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stencilsRef = useRef<StencilTag[]>([
    { x: 15, y: 20, label: "STREET ART", color: "#00ff66", rotation: -12, scale: 1 },
    { x: 80, y: 15, label: "FUTURE AI", color: "#00e5ff", rotation: 8, scale: 1.2 },
    { x: 85, y: 65, label: "WILDSTYLE", color: "#f9f002", rotation: -6, scale: 1.1 },
    { x: 10, y: 75, label: "YKS TAG", color: "#ff2ec4", rotation: 15, scale: 1.3 },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const colors = ["#00ff66", "#00e5ff", "#f9f002", "#ff2ec4", "#ff6a00"];

    // Spray paint effect on mouse move / drag
    const handleMouseMove = (e: MouseEvent) => {
      // Spawn spray mist particles
      const count = Math.floor(Math.random() * 4) + 3;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5;
        const isDrip = Math.random() < 0.08;

        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: isDrip ? Math.random() * 1.5 + 0.5 : Math.sin(angle) * speed,
          size: isDrip ? Math.random() * 3 + 2 : Math.random() * 4 + 1,
          color: baseColor,
          alpha: Math.random() * 0.6 + 0.3,
          decay: Math.random() * 0.008 + 0.004,
          isDrip,
        });
      }

      // Limit array length for memory performance
      if (particlesRef.current.length > 250) {
        particlesRef.current.splice(0, particlesRef.current.length - 250);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render and update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Spray glow effect around larger droplets
        if (p.size > 2.5) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.isDrip) {
          p.vy += 0.03; // gravity for drips
        } else {
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Concrete Wall SVG Texture & Brick Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
        <filter id="wall-texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 0.45 0"
            in="noise"
            result="coloredNoise"
          />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#wall-texture)" fill="#2b2b2e" />
      </svg>

      {/* Interactive Spray Paint Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 opacity-80" />

      {/* Static Vibrant Urban Bloom Glows */}
      <div className="absolute -top-20 left-10 w-96 h-96 bg-[var(--color-neon-green)] rounded-full mix-blend-screen opacity-15 blur-[100px]" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[var(--color-neon-cyan)] rounded-full mix-blend-screen opacity-15 blur-[120px]" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-[var(--color-acid-yellow)] rounded-full mix-blend-screen opacity-10 blur-[110px]" />
      <div className="absolute top-2/3 right-1/3 w-80 h-80 bg-[var(--color-neon-magenta)] rounded-full mix-blend-screen opacity-10 blur-[90px]" />

      {/* Floating Stencil Tags */}
      {stencilsRef.current.map((stencil, idx) => (
        <div
          key={idx}
          className="absolute font-mono font-black tracking-tighter opacity-10 uppercase transition-all duration-700 hover:opacity-40"
          style={{
            top: `${stencil.y}%`,
            left: `${stencil.x}%`,
            color: stencil.color,
            transform: `rotate(${stencil.rotation}deg) scale(${stencil.scale})`,
            fontSize: "2.5rem",
            textShadow: `3px 3px 0 #000, -2px -2px 0 ${stencil.color}`,
          }}
        >
          {stencil.label}
        </div>
      ))}

      {/* Floating Crown & Spray Can Stencil SVG Elements */}
      <div className="absolute top-44 left-1/4 opacity-[0.06] transform -rotate-12 scale-150">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00ff66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </div>

      <div className="absolute bottom-32 right-1/4 opacity-[0.06] transform rotate-12 scale-150">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="14" rx="2" />
          <path d="M12 2v6" />
          <path d="M9 5h6" />
        </svg>
      </div>
    </div>
  );
}
