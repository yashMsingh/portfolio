/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function Floating3DArtifacts() {
  const canvasLeftRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRightRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState(false);

  // Monitor Dark Class on html root
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // 3D Geometry: Double-Cone Octahedron (The Tech-Crystal)
    const crystalVertices: Point3D[] = [
      { x: 0, y: 1.2, z: 0 },    // 0: Top
      { x: 0.9, y: 0, z: 0.9 },   // 1: Mid-Right-Front
      { x: -0.9, y: 0, z: 0.9 },  // 2: Mid-Left-Front
      { x: -0.9, y: 0, z: -0.9 }, // 3: Mid-Left-Back
      { x: 0.9, y: 0, z: -0.9 },  // 4: Mid-Right-Back
      { x: 0, y: -1.2, z: 0 },   // 5: Bottom
    ];

    const crystalEdges: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 4], // Top to mid
      [1, 2], [2, 3], [3, 4], [4, 1], // Mid ring
      [5, 1], [5, 2], [5, 3], [5, 4], // Bottom to mid
    ];

    // Inner Core Geometry for extra depth
    const coreVertices: Point3D[] = [
      { x: 0, y: 0.5, z: 0 },
      { x: 0.4, y: 0, z: 0.4 },
      { x: -0.4, y: 0, z: 0.4 },
      { x: -0.4, y: 0, z: -0.4 },
      { x: 0.4, y: 0, z: -0.4 },
      { x: 0, y: -0.5, z: 0 },
    ];

    // Outer orbital rings
    const ringCount = 24;
    const generateRing = (radius: number, tiltX: number, tiltZ: number): Point3D[] => {
      const pts: Point3D[] = [];
      for (let i = 0; i < ringCount; i++) {
        const theta = (i / ringCount) * Math.PI * 2;
        // Face ring initially on XZ plane
        let rx = Math.cos(theta) * radius;
        let ry = 0;
        let rz = Math.sin(theta) * radius;

        // Apply tilts
        // Pitch (X)
        const cosY = Math.cos(tiltX);
        const sinY = Math.sin(tiltX);
        const ry1 = ry * cosY - rz * sinY;
        const rz1 = ry * sinY + rz * cosY;

        // Roll (Z)
        const cosZ = Math.cos(tiltZ);
        const sinZ = Math.sin(tiltZ);
        const rx2 = rx * cosZ - ry1 * sinZ;
        const ry2 = rx * sinZ + ry1 * cosZ;

        pts.push({ x: rx2, y: ry2, z: rz1 });
      }
      return pts;
    };

    const orbitRing1 = generateRing(1.6, 0.4, 0.3);
    const orbitRing2 = generateRing(2.1, -0.3, 0.6);

    const runRenderer = (
      canvas: HTMLCanvasElement,
      side: "left" | "right"
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = canvas.width;
      let height = canvas.height;

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        width = canvas.parentElement?.clientWidth || 180;
        height = canvas.parentElement?.clientHeight || 280;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
      };

      resize();
      window.addEventListener("resize", resize);

      let animId: number;
      let scrollYRef = 0;
      let currentScrollY = 0;

      const onScroll = () => {
        scrollYRef = window.scrollY;
      };
      window.addEventListener("scroll", onScroll);

      const render = () => {
        // Interpolate scroll for butter-smooth easing transition
        currentScrollY += (scrollYRef - currentScrollY) * 0.08;

        ctx.clearRect(0, 0, width, height);

        // Rotation angles calculated from time + scrollY feedback
        const time = Date.now() * 0.0006;
        const scrollFactor = currentScrollY * 0.0035;

        // Distinct rotations for left and right elements
        const angleX = side === "left" 
          ? time * 0.5 + scrollFactor 
          : time * 0.4 - scrollFactor * 0.8;
        const angleY = side === "left"
          ? time * 0.7 + scrollFactor * 1.2
          : -time * 0.6 + scrollFactor * 1.5;
        const angleZ = side === "left"
          ? time * 0.3
          : time * 0.5;

        // Multi-axis Rotation Helper function
        const rotatePoint = (pt: Point3D): Point3D => {
          // Rotate around X axis
          let cos = Math.cos(angleX);
          let sin = Math.sin(angleX);
          let y1 = pt.y * cos - pt.z * sin;
          let z1 = pt.y * sin + pt.z * cos;

          // Rotate around Y axis
          cos = Math.cos(angleY);
          sin = Math.sin(angleY);
          let x2 = pt.x * cos + z1 * sin;
          let z2 = -pt.x * sin + z1 * cos;

          // Rotate around Z axis
          cos = Math.cos(angleZ);
          sin = Math.sin(angleZ);
          let x3 = x2 * cos - y1 * sin;
          let y3 = x2 * sin + y1 * cos;

          return { x: x3, y: y3, z: z2 };
        };

        // Project 3D points to 2D screen coordinates with perspective
        // Viewport scale and camera translation adjustments
        const scaleFactor = Math.min(width, height) * 0.17; 
        const centerX = width / 2;
        const centerY = height / 2;
        const cameraDistance = 3.8; // Z depth translation

        const project = (pt: Point3D) => {
          const r = rotatePoint(pt);
          const zDepth = r.z + cameraDistance;
          // Standard perspective division schema
          const px = (r.x / zDepth) * scaleFactor * 2.2 + centerX;
          const py = (r.y / zDepth) * scaleFactor * 2.2 + centerY;
          return { x: px, y: py, z: r.z };
        };

        // Dark mode / Light mode thematic palette configurations
        const strokeColor = isDark 
          ? "rgba(197, 160, 89, 0.75)" // Shimmer Gold
          : "rgba(147, 51, 234, 0.7)"; // High-contrast amethyst royalty-purple

        const coreColor = isDark
          ? "rgba(147, 51, 234, 0.65)" // Neon Amethyst purple
          : "rgba(197, 160, 89, 0.65)"; // Glowing Amber gold

        const ringColor = isDark
          ? "rgba(197, 160, 89, 0.25)"
          : "rgba(147, 51, 234, 0.2)";

        // 1. Draw Outer Orbital Rings
        const drawRing = (ringPts: Point3D[]) => {
          ctx.beginPath();
          ctx.lineWidth = 1.0;
          ctx.strokeStyle = ringColor;
          
          const projectedRing = ringPts.map(project);
          
          for (let i = 0; i < projectedRing.length; i++) {
            const nextIdx = (i + 1) % projectedRing.length;
            const p1 = projectedRing[i];
            const p2 = projectedRing[nextIdx];
            
            // Render wireframe fragments with depth-aware fading opacity (back vertices fade out)
            const averageZ = (p1.z + p2.z) / 2;
            const alpha = Math.max(0.08, Math.min(1.0, 1 - (averageZ + 1.2) / 3));
            
            ctx.strokeStyle = isDark
              ? `rgba(197, 160, 89, ${alpha * 0.35})`
              : `rgba(147, 51, 234, ${alpha * 0.3})`;
              
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        };

        drawRing(orbitRing1);
        drawRing(orbitRing2);

        // 2. Draw Crystal Core (Inner geometry)
        const projectedCore = coreVertices.map(project);
        
        ctx.lineWidth = 1.0;
        crystalEdges.forEach(([start, end]) => {
          const p1 = projectedCore[start];
          const p2 = projectedCore[end];
          const averageZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.12, Math.min(0.9, 1 - (averageZ + 0.8) / 2.5));
          
          ctx.strokeStyle = coreColor.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // 3. Draw Outer Crystal Edges
        const projectedVertices = crystalVertices.map(project);

        ctx.shadowBlur = isDark ? 8 : 0;
        ctx.shadowColor = isDark ? "rgba(197, 160, 89, 0.5)" : "transparent";

        crystalEdges.forEach(([start, end]) => {
          const p1 = projectedVertices[start];
          const p2 = projectedVertices[end];
          
          // Calculate line fading depth estimation
          const averageZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.15, Math.min(1.0, 1.2 - (averageZ + 1.2) / 2.6));

          ctx.lineWidth = 1.4;
          ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, `${alpha})`);
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        ctx.shadowBlur = 0; // Reset shadow

        // 4. Draw node points (Beads) with high-intensity glowing highlights
        projectedVertices.forEach((p) => {
          const alpha = Math.max(0.3, Math.min(1.0, 1.2 - (p.z + 1.2) / 2.6));
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = isDark 
            ? `rgba(255, 255, 255, ${alpha})` 
            : `rgba(147, 51, 234, ${alpha})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, 6.5, 0, Math.PI * 2);
          ctx.strokeStyle = strokeColor.replace(/[\d.]+\)$/, `${alpha * 0.5})`);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });

        // 5. Ambient star dust orbiting the core for dynamic game simulation rendering feel
        const dustCount = 8;
        ctx.fillStyle = isDark ? "rgba(197, 160, 89, 0.45)" : "rgba(147, 51, 234, 0.45)";
        for (let idx = 0; idx < dustCount; idx++) {
          const angleOffset = (idx / dustCount) * Math.PI * 2 + time * 0.4;
          const dustRadius = 1.35 + Math.sin(time + idx) * 0.355;
          const dx = Math.cos(angleOffset) * dustRadius;
          const dz = Math.sin(angleOffset) * dustRadius;
          const dy = Math.sin(time * 0.9 + idx) * 0.4;

          const dp = project({ x: dx, y: dy, z: dz });
          const dustAlpha = Math.max(0.1, Math.min(0.85, 1 - (dp.z + 1) / 2));
          
          ctx.beginPath();
          ctx.arc(dp.x, dp.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = isDark 
            ? `rgba(197, 160, 89, ${dustAlpha})`
            : `rgba(147, 51, 234, ${dustAlpha})`;
          ctx.fill();
        }

        // Draw HUD overlay metrics below individual nodes
        ctx.fillStyle = isDark ? "rgba(197, 160, 89, 0.35)" : "rgba(147, 51, 234, 0.3)";
        ctx.font = "bold 8px monospace";
        ctx.textAlign = "center";
        
        const spinValue = Math.round((angleY * 180 / Math.PI) % 360);
        ctx.fillText(`ROT: Y // ${spinValue}°`, centerX, height - 12);

        animId = requestAnimationFrame(render);
      };

      render();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll);
      };
    };

    let cleanupLeft: (() => void) | undefined;
    let cleanupRight: (() => void) | undefined;

    if (canvasLeftRef.current) {
      cleanupLeft = runRenderer(canvasLeftRef.current, "left");
    }
    if (canvasRightRef.current) {
      cleanupRight = runRenderer(canvasRightRef.current, "right");
    }

    return () => {
      if (cleanupLeft) cleanupLeft();
      if (cleanupRight) cleanupRight();
    };
  }, [isDark]);

  return (
    <>
      {/* Left fixed container mapping layout */}
      <div 
        className="fixed top-1/3 left-4 xl:left-8 w-28 md:w-36 lg:w-44 h-80 -translate-y-1/2 z-30 select-none pointer-events-none hidden md:flex flex-col items-center justify-center opacity-85"
        id="hud-3d-left-container"
      >
        <span className="text-[8px] font-mono tracking-widest text-[#c5a059] opacity-65 mb-1.5 uppercase font-bold">
          [Telemetry L]
        </span>
        <div className="w-full h-full relative border border-brand-purple/15 rounded-xl bg-black/5 dark:bg-black/25 backdrop-blur-[2px]">
          {/* Futuristic grid/axis labels */}
          <div className="absolute top-2 left-2 text-[7px] font-mono text-brand-purple/50">SEC: 01</div>
          <div className="absolute bottom-2 right-2 text-[7px] font-mono text-brand-purple/50">SYS // OK</div>
          <canvas ref={canvasLeftRef} className="w-full h-full" />
        </div>
      </div>

      {/* Right fixed container mapping layout */}
      <div 
        className="fixed top-2/3 right-4 xl:right-8 w-28 md:w-36 lg:w-44 h-80 -translate-y-1/2 z-30 select-none pointer-events-none hidden md:flex flex-col items-center justify-center opacity-85"
        id="hud-3d-right-container"
      >
        <span className="text-[8px] font-mono tracking-widest text-[#c5a059] opacity-65 mb-1.5 uppercase font-bold">
          [Telemetry R]
        </span>
        <div className="w-full h-full relative border border-brand-purple/15 rounded-xl bg-black/5 dark:bg-black/25 backdrop-blur-[2px]">
          {/* Futuristic grid/axis labels */}
          <div className="absolute top-2 right-2 text-[7px] font-mono text-brand-purple/50">SEC: 02</div>
          <div className="absolute bottom-2 left-2 text-[7px] font-mono text-brand-purple/50">[3D_ORB]</div>
          <canvas ref={canvasRightRef} className="w-full h-full" />
        </div>
      </div>
    </>
  );
}
