import { useState, useEffect } from "react";
import Header from "./components/Header";
import GraffitiBackground from "./components/GraffitiBackground";
import Hero from "./components/Hero";
import Spotlight from "./components/Spotlight";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Credentials from "./components/Credentials";
import Footer from "./components/Footer";
import Lenis from "lenis";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const sections = ["overview", "experience", "projects", "skills", "credentials", "identity"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger scroll check on startup
    handleScroll();
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--color-wall-dark)] font-sans antialiased pb-12 overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      
      {/* Background patterns */}
      <GraffitiBackground />

      {/* Navigation & Sections layout */}
      <Header activeSection={activeSection} />
      
      <main className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Credentials />
        <Spotlight />
        <Footer />
      </main>
    </div>
  );
}
