import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail, Instagram, Youtube } from "lucide-react";
import { resumeData } from "../data";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./ui/Magnetic";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Overview", id: "overview" },
    { label: "Internships", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Credentials", id: "credentials" },
    { label: "Spotlight", id: "identity" }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-panel rounded-none border-b-2 border-b-[var(--color-neon-magenta)] py-3.5 shadow-[0_4px_0_0_rgba(0,0,0,1)] bg-[var(--color-wall-dark)]/95"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between gap-6 w-full">
            {/* Left Brand Badge */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => scrollToSection("overview")}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-black border-2 border-[var(--color-neon-magenta)] text-white font-extrabold text-xs tracking-widest uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[var(--color-neon-magenta)] hover:text-black transition-all cursor-pointer"
              >
                <span className="text-[var(--color-acid-yellow)]">YKS</span>
                <span className="text-[10px] text-slate-400 font-mono">PORTFOLIO</span>
              </button>
            </div>

            {/* Desktop Navigation Group */}
            <div className="flex-1 md:flex-initial flex justify-start md:justify-center">
              <nav className="hidden md:flex items-center gap-2 bg-black border-2 border-[var(--color-acid-yellow)] p-1.5 rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-4 lg:px-5 py-2 rounded-none font-display text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                        isActive ? "text-black" : "text-white hover:text-[var(--color-neon-cyan)]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-[var(--color-acid-yellow)]"
                          transition={{ duration: 0.3, type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Action Buttons (Right) */}
            <div className="hidden md:flex items-center justify-end gap-3.5">
              <Magnetic intensity={0.2}>
                <a
                  href={resumeData.github}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="p-2.5 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="GitHub Profile"
                >
                  <Github size={17} />
                </a>
              </Magnetic>
              <Magnetic intensity={0.2}>
                <a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="p-2.5 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={17} />
                </a>
              </Magnetic>
              {resumeData.instagram && (
                <Magnetic intensity={0.2}>
                  <a
                    href={resumeData.instagram}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2.5 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="Instagram Profile"
                  >
                    <Instagram size={17} />
                  </a>
                </Magnetic>
              )}
              {resumeData.youtube && (
                <Magnetic intensity={0.2}>
                  <a
                    href={resumeData.youtube}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2.5 rounded-none bg-black border-2 border-white text-white hover:border-[var(--color-neon-cyan)] hover:text-[var(--color-neon-cyan)] shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                    aria-label="YouTube Channel"
                  >
                    <Youtube size={17} />
                  </a>
                </Magnetic>
              )}
              
              <Magnetic intensity={0.1}>
                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-neon-magenta)] text-white hover:bg-[var(--color-deep-purple)] border-2 border-black text-xs uppercase font-extrabold tracking-wider rounded-none shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Mail size={15} className="text-[var(--color-acid-yellow)]" />
                  <span>Contact</span>
                </a>
              </Magnetic>
            </div>

            {/* Mobile Action Group (Menu icon) */}
            <div className="flex md:hidden items-center gap-2 ml-auto">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-white hover:text-[var(--color-neon-magenta)] bg-black border-2 border-white rounded-none cursor-pointer transition-colors flex items-center justify-center shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[75px] z-40 p-5 mx-4 rounded-none bg-[var(--color-wall-mid)] border-4 border-black md:hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          >
            <div className="flex flex-col gap-3 py-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-none font-display text-sm font-bold uppercase tracking-wide transition-all border-2 ${
                      isActive
                        ? "bg-[var(--color-acid-yellow)] text-black border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                        : "text-white hover:bg-black/40 border-transparent"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-black" : "bg-transparent"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="border-t-2 border-black my-2 pt-4 flex items-center justify-between px-2">
                <div className="flex gap-2.5">
                  <a
                    href={resumeData.github}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2.5 rounded-none bg-black border-2 border-[var(--color-neon-magenta)] text-[var(--color-neon-magenta)] hover:bg-[var(--color-neon-magenta)] hover:text-black transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={resumeData.linkedin}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2.5 rounded-none bg-black border-2 border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] hover:bg-[var(--color-neon-cyan)] hover:text-black transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  {resumeData.instagram && (
                    <a
                      href={resumeData.instagram}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="p-2.5 rounded-none bg-black border-2 border-[var(--color-spray-orange)] text-[var(--color-spray-orange)] hover:bg-[var(--color-spray-orange)] hover:text-black transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                  {resumeData.youtube && (
                    <a
                      href={resumeData.youtube}
                      target="_blank"
                      rel="noreferrer referrer"
                      className="p-2.5 rounded-none bg-black border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Youtube size={18} />
                    </a>
                  )}
                </div>

                <a
                  href={`mailto:${resumeData.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-acid-yellow)] text-xs font-bold uppercase rounded-none border-2 border-black text-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                >
                  <Mail size={14} />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
