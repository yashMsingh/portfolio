/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

export default function GLSLHills() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try to get WebGL context
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("WebGL not supported by this browser. Falling back to background gradients.");
      setWebGLSupported(false);
      return;
    }

    // Vertex shader source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader source featuring optimized 3D heightfield raymarched ridges,
    // scrolling coordinates, horizon glowing haze, and mouse parallax interaction.
    const fsSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Simple pseudorandom hash generator
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // 2D Noise
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion (3 octaves for high speed)
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(50.0);
        for (int i = 0; i < 3; ++i) {
          v += a * noise(p);
          p = p * 2.2 + shift;
          a *= 0.45;
        }
        return v;
      }

      // Procedural height mapping representation for 3D mountains
      float terrain(vec2 p) {
        float h = fbm(p * 0.35);
        return h * h * 2.9; // valley compression for sharp ridges
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Smooth mouse interactive translation
        float mouseX = u_mouse.x * 0.15;
        float mouseY = u_mouse.y * 0.12;

        // Camera positioning moving systematically along the timeline Z
        vec3 ro = vec3(mouseX, 1.9 + mouseY, u_time * 0.18);
        vec3 rd = normalize(vec3(p.x, p.y - 0.22, 1.0));

        float t = 0.1;
        float max_t = 16.0;
        bool hit = false;
        vec3 pos = vec3(0.0);

        // Optimised raymarching loops
        for (int i = 0; i < 38; i++) {
          pos = ro + rd * t;
          float h = terrain(pos.xz);
          if (pos.y < h) {
            hit = true;
            break;
          }
          t += max(0.04, (pos.y - h) * 0.38);
          if (t > max_t) break;
        }

      // Deep immersive background color matching UI palette (pristine light silver)
      vec3 skyColor = mix(vec3(0.98, 0.98, 0.99), vec3(0.92, 0.93, 0.95), uv.y);
      
      // Dynamic horizon atmospheric scattering (Luxury gold warmth haze)
      float horizonLine = exp(-abs(p.y - 0.04) * 6.5);
      skyColor += vec3(0.77, 0.62, 0.35) * horizonLine * 0.18;

      vec3 color = skyColor;

      if (hit) {
        // Precise finite difference normal calculation
        vec2 eps = vec2(0.025, 0.0);
        vec3 n = normalize(vec3(
          terrain(pos.xz - eps.xy) - terrain(pos.xz + eps.xy),
          eps.x * 2.0,
          terrain(pos.xz - eps.yx) - terrain(pos.xz + eps.yx)
        ));

        // Stylised Neon wireframe/grid lines drawing
        float gridScale = 3.3;
        float gridX = smoothstep(0.92, 0.98, sin(pos.x * gridScale));
        float gridZ = smoothstep(0.92, 0.98, sin(pos.z * gridScale));
        float wireframeState = max(gridX, gridZ);

        // Grid glowing colors transitioning from Gold to Elegant Deep Graphite
        vec3 colorGold = vec3(0.77, 0.62, 0.35);
        vec3 colorGraphite = vec3(0.12, 0.12, 0.15);
        vec3 gridGlow = mix(colorGold, colorGraphite, sin(pos.z * 0.12 - u_time * 0.1) * 0.5 + 0.5);

        // Pristine silver base terrain
        vec3 baseTerrain = vec3(0.97, 0.97, 0.98);

        // Merge base floor and bright vector contours
        vec3 terrainColor = mix(baseTerrain, gridGlow, wireframeState * 0.28);

        // Edge accent enhancement
        float edgeBright = max(0.0, 1.0 - dot(n, -rd));
        terrainColor += gridGlow * pow(edgeBright, 3.0) * 0.15;

        // Thick interactive fog transition
        float fogIntensity = exp(-t * 0.15);
        color = mix(skyColor, terrainColor, fogIntensity);
      } else {
        // Tiny glowing golden particles in space instead of blue stars
        float starFactor = hash(floor(p * 50.0));
        if (starFactor > 0.997) {
          float shine = sin(u_time * 1.8 + starFactor * 12.0) * 0.5 + 0.5;
          color += vec3(0.77, 0.62, 0.35) * shine * 0.3 * smoothstep(-0.2, 0.3, p.y);
        }
      }

      // Extra bottom linear vignette shading to gracefully transition background back to soft slate
      color = mix(color, vec3(0.96, 0.96, 0.98), (1.0 - uv.y) * 0.45);

      gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper: Compile individual shader type
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader build error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) {
      setWebGLSupported(false);
      return;
    }

    // Create and link shader program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link failed:", gl.getProgramInfoLog(program));
      setWebGLSupported(false);
      return;
    }

    gl.useProgram(program);

    // Quad coordinates vertices targeting full screen coverage
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    // Uniform storage locations
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Dynamic mouse cursor positioning coordinates
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1; // inversion
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        targetMouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationFrameId = 0;
    const startTime = performance.now();

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        // Dynamic resolution capping for optimal mobile rendering rates
        const scale = dpr > 1.5 ? 1.5 : dpr;
        canvas.width = width * scale;
        canvas.height = height * scale;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Initialize resolution
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Primary frame renderer tick
    const render = () => {
      resizeCanvas();

      const elapsed = (performance.now() - startTime) / 1000;

      // Smooth coordinate damping interpolation for mouse momentum
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Supply uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, currentMouseX, currentMouseY);

      // Render triangles
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Context Clean disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resizeCanvas);
      
      gl.deleteBuffer(vertexBuffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none w-full h-full select-none" id="glsl-hills-container">
      {/* GLSL Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block object-cover transition-opacity duration-1000 ${
          webGLSupported ? "opacity-45" : "opacity-0"
        }`}
      />
      
      {/* Minimal Elegant static background gradient container as safety fallback if WebGL fails */}
      {!webGLSupported && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] via-[#f1f3f5] to-[#f8f9fa]">
          <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-brand-purple/5 via-transparent to-transparent blur-3xl opacity-60" />
        </div>
      )}
    </div>
  );
}
